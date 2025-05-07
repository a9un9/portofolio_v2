import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Untuk melakukan redirect
import API from '../../services/api';
import SideNavbar from '../../components/admin/SideNavbar';
import TopNavbar from '../../components/admin/TopNavbar';
import Footer from '../../components/admin/Footer';
import '../../assets/css/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UploadFoto from './ProfilUpload';

function Profil() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    photo: null,
    deskripsi: '',
  });
  const [loading, setLoading] = useState(false);  // Menambahkan state loading
  const navigate = useNavigate();  // Untuk melakukan redirect

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Anda harus login terlebih dahulu!');
      navigate('/login');  // Arahkan ke halaman login jika token tidak ada
    } else {
      API.get('/auth/user')
        .then((response) => {
          setUser(response.data);
          setFormData({
            name: response.data.name,
            email: response.data.email,
            username: response.data.username,
            password: '',
            deskripsi: response.data.deskripsi || '',  // <-- tambahkan ini
          });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          toast.error('Gagal memuat data profil');
        });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Menetapkan loading saat pengiriman form
    const token = localStorage.getItem('token');

    const updateData = {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      deskripsi: formData.deskripsi,
    };

    if (formData.password) {
      updateData.password = formData.password;
    }

    if (token) {
      API.put('/auth/user', updateData)
        .then(() => {
          toast.success('Profil berhasil diperbarui');

          // Refresh data
          API.get('/auth/user')
            .then((res) => {
              setUser(res.data);
              setFormData(prev => ({ ...prev, password: '' }));
            })
            .catch((err) => {
              console.error('Error refreshing user data:', err);
              toast.error('Gagal memuat ulang data profil');
            });
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
          toast.error('Gagal memperbarui profil');
        })
        .finally(() => {
          setLoading(false); // Menonaktifkan loading setelah selesai
        });
    }
  };

  // const handleLogout = () => {
  //   // Menghapus token dari localStorage
  //   localStorage.removeItem('token');
  //   toast.success('Anda berhasil logout');
  //   navigate('/login');  // Arahkan pengguna ke halaman login setelah logout
  // };

  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div style={{ marginLeft: sidebarOpen ? '200px' : '50px', width: '100%', transition: 'margin-left 0.3s' }}>
        <TopNavbar isSidebarOpen={sidebarOpen} />

        <main style={{ padding: '2rem', minHeight: '80vh', marginTop: '60px' }}>
          {user === null ? (
            <div className="loading-container">
              <div className="loading-text">
                Loading<span className="dot-anim">.</span><span className="dot-anim">.</span><span className="dot-anim">.</span>
              </div>
            </div>
          ) : (
            <>
              <h3>Profil Pengguna</h3>
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                
                {/* Form Profil */}
                <form onSubmit={handleSubmit} className="profile-form" style={{ flex: 1, minWidth: '300px' }}>
                  <div className="form-group">
                    <label>Nama:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Username:</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Password (kosongkan jika tidak ingin mengganti):</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Deskripsi</label>
                    <textarea
                      className="form-control"
                      rows="5" // <- tambah baris jadi lebih tinggi
                      value={formData.deskripsi}
                      onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                      required
                    />
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Menyimpan...' : 'Update Profil'}
                  </button>
                </form>

                {/* Upload Foto */}
                <div style={{ flex: '0 0 300px' }}>
                  <UploadFoto photo={formData.photo} setPhoto={(photo) => setFormData(prev => ({ ...prev, photo }))} />
                </div>
              </div>

              {/* <button onClick={handleLogout} className="logout-btn">
                Logout
              </button> */}
            </>
          )}
        </main>

        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default Profil;
