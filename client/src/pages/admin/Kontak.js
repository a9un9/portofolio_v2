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
import { Modal, Button } from 'react-bootstrap';

function Kontak() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [kontaks, setKontaks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    email: '',
    subject: '',
    message: '',
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
    API.get('/kontak')
      .then(res => {
        setKontaks(Array.isArray(res.data) ? res.data : []);
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
        nama: data.nama ?? '',
        email: data.email ?? '',
        subject: data.subject ?? '',
        message: data.message ?? '',
      });
    } else {
      setFormData({
        id: '',
        nama: '',
        email: '',
        subject: '',
        message: '',
      });
    }
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = formData.id ? API.put : API.post;
    const url = formData.id ? `/kontak/${formData.id}` : '/kontak';

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
    API.delete(`/kontak/${idToDelete}`)
      .then(() => {
        setKontaks(kontaks.filter(item => item.id !== idToDelete));
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

  const filteredData = kontaks.filter(item =>
    (item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.subject?.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <h3 className="mb-4">Kontak</h3>

          <div className="mb-3">
            {/* <div className="mb-2">
              <button className="btn btn-primary" onClick={() => openModal()}>
                Tambah
              </button>
            </div> */}
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
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length > 0 ? currentData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{indexOfFirst + index + 1}</td>
                      <td>{item.nama}</td>
                      <td>{item.email}</td>
                      <td>{item.subject}</td>
                      <td>{item.message}</td>
                      <td>
                        <button className="btn btn-warning btn-sm me-2" onClick={() => openModal(item)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Hapus</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" className="text-center">Belum ada data</td>
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

        {/* Modal Tambah/Edit Kontak */}
        <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{formData.id ? 'Edit Kontak' : 'Tambah Kontak'}</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="form-group mb-3">
                <label htmlFor="nama">Nama</label>
                <input
                  type="text"
                  id="nama"
                  className="form-control"
                  value={formData.nama}
                  onChange={e => setFormData({ ...formData, nama: e.target.value })}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  className="form-control"
                  rows="3"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
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

export default Kontak;
