import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate untuk redirect
import API from '../../services/api';
import SideNavbar from '../../components/admin/SideNavbar';
import TopNavbar from '../../components/admin/TopNavbar';
import Footer from '../../components/admin/Footer';
import { ToastContainer, toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/style.css';

function TentangKami() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tentangKami, setTentangKami] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataExists, setDataExists] = useState(false);
  const navigate = useNavigate();  // Untuk melakukan redirect jika token tidak ada

  // Fetch data from API or localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Anda harus login terlebih dahulu!');
      navigate('/login');  // Arahkan ke halaman login jika token tidak ada
    } else {
      // const savedTentangKami = localStorage.getItem('tentangKami');
      // if (savedTentangKami) {
      //   setTentangKami(savedTentangKami);
      //   setDataExists(true);
      //   setLoading(false);
      // } else {
        API.get('/tentang-kami')
          .then(res => {
            console.log('API Response:', res); // Log the response to inspect the data
            if (res.data && res.data.deskripsi) {
              setTentangKami(res.data.deskripsi);
              setDataExists(true);
            } else {
              setTentangKami('');
              setDataExists(false);
              toast.warning(res.data?.message || 'Data kosong');
            }
            setLoading(false);
          })
          .catch(err => {
            console.error(err);
            toast.error(err.response?.data?.message || 'Gagal memuat data');
            setLoading(false);
          });
      // }
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = dataExists ? API.put : API.post;

    setLoading(true);

    method('/tentang-kami', { deskripsi: tentangKami })
      .then(() => {
        toast.success('Tentang Kami berhasil disimpan');
        setDataExists(true);
        localStorage.setItem('tentangKami', tentangKami);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || 'Gagal menyimpan Tentang Kami');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideNavbar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

      <div style={{ marginLeft: sidebarOpen ? '200px' : '50px', width: '100%', transition: 'margin-left 0.3s' }}>
        <TopNavbar isSidebarOpen={sidebarOpen} />

        <main style={{ padding: '2rem', minHeight: '80vh', marginTop: '60px' }}>
          <h3>Tentang Kami</h3>

          {loading ? (
            <div className="loading-container">
              <div className="loading-text">
                Loading<span className="dot-anim">.</span><span className="dot-anim">.</span><span className="dot-anim">.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Deskripsi Tentang Kami:</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={tentangKami}  // Make sure this is correctly bound to the state
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setTentangKami(data);
                  }}
                  config={{
                    removePlugins: ['Resize'],
                    height: 300
                  }}
                  style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </form>
          )}
        </main>

        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}

export default TentangKami;
