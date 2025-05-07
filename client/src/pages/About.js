import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import '../assets/css/about.css';
import '../assets/css/style2.css';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Coba untuk mengambil data dari API
    axios.get('http://localhost:5000/api/tentang-kami/client')
      .then(response => {
        setAboutData(response.data);
        setLoading(false);
      })
      .catch(error => {
        // Tangani error jika tidak ada koneksi atau endpoint salah
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    // Tampilkan loading dengan spinner jika masih dalam proses pengambilan data
    return (
      <section id="about" className="about">
        <div className="container">
          <h2>About Me</h2>
          <div className="flex justify-center items-center h-screen">
            <div className="spinner"></div> {/* Menampilkan spinner animasi */}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    // Jika error terjadi, tampilkan pesan error
    return (
        <section id="about" className="about">
            <div className="container">
                <h2>About Me</h2>
                <div className="flex justify-center items-center h-screen text-red-500">
                    <p className="text-center">{`Error: ${error.message}. Please check your connection or try again later.`}</p>
                </div>
            </div>
        </section>
    );
  }

  // Menghapus tag <p> dari konten yang diambil
  const contentWithoutParagraph = aboutData ? aboutData.deskripsi.replace(/<p>/g, '').replace(/<\/p>/g, '') : 'No data available';

  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <p>{contentWithoutParagraph}</p>  {/* Menampilkan konten tanpa tag <p> */}
      </div>
    </section>
  );
};

export default About;
