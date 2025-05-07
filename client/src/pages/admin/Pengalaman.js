import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import SideNavbar from '../../components/admin/SideNavbar';
import TopNavbar from '../../components/admin/TopNavbar';
import Footer from '../../components/admin/Footer';
import { ToastContainer, toast } from 'react-toastify'; // <-- ToastContainer is now used
import 'react-toastify/dist/ReactToastify.css'; // <-- Import toast styles
import '../../assets/css/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

function Pengalaman() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pengalaman, setPengalaman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [formData, setFormData] = useState({
    id: '',
    nama_perusahaan: '',
    tempat: '',
    posisi: '',
    tahun_masuk: '',
    tahun_keluar: '',
    deskripsi: '',
    tipe_pengalaman: '',
  });

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
    API.get('/pengalaman')
      .then(res => {
        setPengalaman(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const formatTanggal = (dateString) => {
    // Periksa apakah dateString valid
    if (!dateString || typeof dateString !== 'string') {
      return 'Present'; // Return '-' jika invalid atau kosong
    }
  
    // Mengonversi string ISO 8601 menjadi objek Date
    const dateObj = new Date(dateString);
  
    // Periksa apakah objek Date valid
    if (isNaN(dateObj)) {
      return '-'; // Return '-' jika tidak valid
    }
  
    // Ambil hari, bulan, dan tahun dari objek Date
    const day = String(dateObj.getDate()).padStart(2, '0'); // Menambah nol di depan jika hari < 10
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0, jadi kita tambahkan 1
    const year = dateObj.getFullYear();
  
    // Kembalikan format dd-mm-yyyy
    return `${day}-${month}-${year}`;
  };

  const openModal = (data = null) => {
    if (data) {
      const formatDateForInput = (dateString) => {
        const dateObj = new Date(dateString);
        if (isNaN(dateObj)) return ''; // Mengembalikan string kosong jika tanggal tidak valid
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Bulan mulai dari 0, jadi tambah 1
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Format yyyy-mm-dd
      };
  
      setFormData({
        id: data.id,
        nama_perusahaan: data.nama_perusahaan ?? '',
        tempat: data.tempat ?? '',
        posisi: data.posisi ?? '',
        tahun_masuk: formatDateForInput(data.tahun_masuk) ?? '',
        tahun_keluar: formatDateForInput(data.tahun_keluar) ?? '',
        deskripsi: data.deskripsi ?? '',
        tipe_pengalaman: data.tipe_pengalaman ?? '',
      });
    } else {
      setFormData({
        id: '',
        nama_perusahaan: '',
        tempat: '',
        posisi: '',
        tahun_masuk: '',
        tahun_keluar: '',
        deskripsi: '',
        tipe_pengalaman: '',
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = formData.id ? API.put : API.post;
    const url = formData.id ? `/pengalaman/${formData.id}` : '/pengalaman';

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
    setIdToDelete(id);
    setConfirmDelete(true);
  };

  const confirmDeleteHandler = () => {
    API.delete(`/pengalaman/${idToDelete}`)
      .then(() => {
        setPengalaman(pengalaman.filter(item => item.id !== idToDelete));
        toast.success('Data berhasil dihapus');
        setConfirmDelete(false);
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Gagal menghapus data');
        setConfirmDelete(false);
      });
  };

  const cancelDeleteHandler = () => {
    setConfirmDelete(false);
  };

  const filteredData = pengalaman.filter(item =>
    (item.nama_perusahaan?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.tempat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.posisi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.tahun_masuk?.toString().includes(searchTerm.toLowerCase()) ||
     item.tahun_keluar?.toString().includes(searchTerm.toLowerCase()) ||
     item.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <h3 className="mb-4">Pengalaman Kerja</h3>

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
                    <th>Nama Perusahaan</th>
                    <th>Tempat</th>
                    <th>Posisi</th>
                    <th>Tahun Masuk</th>
                    <th>Tahun Keluar</th>
                    <th>Deskripsi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length > 0 ? currentData.map((item, index) => (
                    <tr key={item.id}>
                      <td style={{ width: '5%' }}>{indexOfFirst + index + 1}</td>
                      <td style={{ width: '20%' }}>{item.nama_perusahaan}</td>
                      <td style={{ width: '10%' }}>{item.tempat}</td>
                      <td style={{ width: '10%' }}>{item.posisi}</td>
                      <td style={{ width: '10%' }}>{formatTanggal(item.tahun_masuk)}</td>
                      <td style={{ width: '10%' }}>{formatTanggal(item.tahun_keluar)}</td>
                      <td style={{ width: '25%' }}>{item.deskripsi}</td>
                      <td style={{ width: '15%' }}>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => openModal(item)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Hapus</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="8" className="text-center">Data tidak ditemukan</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {renderPagination()}

          {/* Modal Form */}
          <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{formData.id ? 'Edit Pengalaman' : 'Tambah Pengalaman'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nama Perusahaan</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.nama_perusahaan}
                  onChange={(e) => setFormData({ ...formData, nama_perusahaan: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tempat</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.tempat}
                  onChange={(e) => setFormData({ ...formData, tempat: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Posisi</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.posisi}
                  onChange={(e) => setFormData({ ...formData, posisi: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tahun Masuk</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.tahun_masuk}
                  onChange={(e) => setFormData({ ...formData, tahun_masuk: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tahun Keluar</label>
                <input
                  type="date"
                  className="form-control"
                  value={formData.tahun_keluar}
                  onChange={(e) => setFormData({ ...formData, tahun_keluar: e.target.value })}
                  
                />
              </div>
              <div className="form-group">
                <label>Deskripsi</label>
                <textarea
                  className="form-control"
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tipe Pengalaman</label>
                <select
                  className="form-control"
                  value={formData.tipe_pengalaman}
                  onChange={(e) => setFormData({ ...formData, tipe_pengalaman: e.target.value })}
                  required
                >
                  <option value="">Pilih tipe pengalaman</option>
                  <option value="1">Pegawai kontrak</option>
                  <option value="2">Pegawai tetap</option>
                  <option value="3">Freelance</option>
                </select>
              </div>

              <Modal.Footer>
                <Button type="submit" variant="primary">
                  {formData.id ? 'Ubah' : 'Simpan'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Tutup
                </Button>
              </Modal.Footer>
            </form>
            </Modal.Body>
          </Modal>

          {/* Modal Confirmation Delete */}
          <Modal show={confirmDelete} onHide={cancelDeleteHandler}>
            <Modal.Header closeButton>
              <Modal.Title>Konfirmasi</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Apakah Anda yakin ingin menghapus data ini?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={cancelDeleteHandler}>Batal</Button>
              <Button variant="danger" onClick={confirmDeleteHandler}>Hapus</Button>
            </Modal.Footer>
          </Modal>

        </main>

        <Footer />
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
}

export default Pengalaman;
