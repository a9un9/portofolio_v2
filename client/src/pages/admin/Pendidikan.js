import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import SideNavbar from '../../components/admin/SideNavbar';
import TopNavbar from '../../components/admin/TopNavbar';
import Footer from '../../components/admin/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Import Modal dan Button

function Pendidikan() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [gelar, setGelar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    nama_sekolah: '',
    tahun_masuk: '',
    tahun_lulus: '',
    gelar: '',
    jurusan: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(false); // State untuk mengonfirmasi penghapusan
  const [idToDelete, setIdToDelete] = useState(null); // Menyimpan id yang ingin dihapus
  const itemsPerPage = 5;

  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem('user');
      if (!user) {
        navigate('/login');
      }
    };

    checkUser();
    fetchData();
  }, [navigate]);

  const fetchData = () => {
    setLoading(true);
    API.get('/pendidikan')
      .then(res => {
        setGelar(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const openModal = (data = null) => {
    if (data) {
      setFormData({
        id: data.id,
        nama_sekolah: data.nama_sekolah,
        tahun_masuk: data.tahun_masuk,
        tahun_lulus: data.tahun_lulus,
        gelar: data.gelar?.toString() ?? '',  // Fix: pastikan string
        jurusan: data.jurusan ?? '',
      });
    } else {
      setFormData({
        id: '',
        nama_sekolah: '',
        tahun_masuk: '',
        tahun_lulus: '',
        gelar: '',
        jurusan: '',
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = formData.id ? API.put : API.post;
    const url = formData.id ? `/pendidikan/${formData.id}` : '/pendidikan';

    method(url, formData)
      .then(() => {
        toast.success(formData.id ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
        setModalOpen(false);
        fetchData();
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Gagal menyimpan data');
      });
  };

  const handleDelete = (id) => {
    setIdToDelete(id); // Menyimpan id yang ingin dihapus
    setConfirmDelete(true); // Tampilkan modal konfirmasi
  };

  const confirmDeleteHandler = () => {
    API.delete(`/pendidikan/${idToDelete}`)
      .then(() => {
        setGelar(gelar.filter(item => item.id !== idToDelete));
        toast.success('Data berhasil dihapus');
        setConfirmDelete(false); // Tutup modal konfirmasi
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Gagal menghapus data');
        setConfirmDelete(false); // Tutup modal konfirmasi
      });
  };

  const cancelDeleteHandler = () => {
    setConfirmDelete(false); // Tutup modal konfirmasi jika batal
  };

  const filteredData = gelar.filter(item =>
    (item.nama_sekolah?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.jurusan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (item.gelar ?? '').toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.tahun_masuk?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.tahun_lulus?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const renderPagination = () => (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setCurrentPage(prev => prev - 1)}>Sebelumnya</button>
        </li>
        {[...Array(totalPages)].map((_, i) => (
          <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>Berikutnya</button>
        </li>
      </ul>
    </nav>
  );

  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

      <div style={{ marginLeft: sidebarOpen ? '200px' : '50px', width: '100%', transition: 'margin-left 0.3s' }}>
        <TopNavbar isSidebarOpen={sidebarOpen} />

        <main style={{ padding: '2rem', minHeight: '80vh', marginTop: '60px' }}>
          <h3 className="mb-4">Pendidikan</h3>

            <div className="mb-3">
                <div className="mb-2">
                    <button className="btn btn-primary" onClick={() => openModal()}>
                    Tambah
                    </button>
                </div>
                <div className="input-group" style={{ maxWidth: '300px' }}>
                    <span className="input-group-text">
                    <FaSearch />
                    </span>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Cari ..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    />
                </div>
            </div>

          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>No</th>
                    <th>Pendidikan</th>
                    <th>Nama Sekolah</th>
                    <th>Jurusan</th>
                    <th>Tahun Masuk</th>
                    <th>Tahun Lulus</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length > 0 ? currentData.map((item, index) => {
                    // Pastikan gelar menjadi integer
                    const gelar = parseInt(item.gelar, 10);
                    let gelarText = 'Tidak sekolah'; // Default value

                    // Switch statement untuk menentukan gelar
                    switch(gelar) {
                      case 1:
                        gelarText = 'TK';
                        break;
                      case 2:
                        gelarText = 'SD';
                        break;
                      case 3:
                        gelarText = 'SMP';
                        break;
                      case 4:
                        gelarText = 'SMA/SMK';
                        break;
                      case 5:
                        gelarText = 'S1';
                        break;
                      case 6:
                        gelarText = 'S2';
                        break;
                      case 7:
                        gelarText = 'S3';
                        break;
                      default:
                        break;
                    }

                    return (
                      <tr key={item.id}>
                        <td>{indexOfFirst + index + 1}</td>    
                        <td>{gelarText}</td>
                        <td>{item.nama_sekolah}</td>
                        <td>{item.jurusan}</td>
                        <td>{item.tahun_masuk}</td>
                        <td>{item.tahun_lulus}</td>
                        <td>
                          <button className="btn btn-warning btn-sm me-2" onClick={() => openModal(item)}>Edit</button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Hapus</button>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan="7" className="text-center">Belum ada data</td>
                    </tr>
                  )}
                </tbody>
              </table>

              {renderPagination()}
            </div>
          )}
        </main>

        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Modal Konfirmasi Hapus */}
        <Modal show={confirmDelete} onHide={cancelDeleteHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Konfirmasi Hapus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Apakah Anda yakin ingin menghapus data ini?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={confirmDeleteHandler}>
              Hapus
            </Button>
            <Button variant="secondary" onClick={cancelDeleteHandler}>
              Batal
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal Tambah/Edit Pendidikan */}
        <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{formData.id ? 'Edit Pendidikan' : 'Tambah Pendidikan'}</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="nama_sekolah">Nama Sekolah</label>
                <input
                  type="text"
                  id="nama_sekolah"
                  className="form-control"
                  value={formData.nama_sekolah}
                  onChange={e => setFormData({ ...formData, nama_sekolah: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="tahun_masuk">Tahun Masuk</label>
                <input
                  type="number"
                  id="tahun_masuk"
                  className="form-control"
                  value={formData.tahun_masuk}
                  onChange={e => setFormData({ ...formData, tahun_masuk: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="tahun_lulus">Tahun Lulus</label>
                <input
                  type="number"
                  id="tahun_lulus"
                  className="form-control"
                  value={formData.tahun_lulus}
                  onChange={e => setFormData({ ...formData, tahun_lulus: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gelar">Gelar</label>
                <select
                  id="gelar"
                  className="form-control"
                  value={formData.gelar}
                  onChange={e => setFormData({ ...formData, gelar: e.target.value })}
                  required
                >
                  <option value="">Pilih Gelar</option>
                  <option value="1">TK</option>
                  <option value="2">SD</option>
                  <option value="3">SMP</option>
                  <option value="4">SMK</option>
                  <option value="5">S1</option>
                  <option value="6">S2</option>
                  <option value="7">S3</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="jurusan">Jurusan</label>
                <input
                  type="text"
                  id="jurusan"
                  className="form-control"
                  value={formData.jurusan}
                  onChange={e => setFormData({ ...formData, jurusan: e.target.value })}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" variant="primary">
                {formData.id ? 'Ubah' : 'Simpan'}
              </Button>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Tutup
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default Pendidikan;
