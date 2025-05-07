import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/css/education.css'; // Custom CSS kamu

const Education = () => {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    axios.get('http://localhost:5000/api/pendidikan/client')
      .then(response => {
        setEducationData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="education">
        <div className="content-inner">
          <div className="content-header">
            <h2>Education</h2>
          </div>
          <div className="loader">Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="education">
        <div className="content-inner">
          <div className="content-header">
            <h2>Education</h2>
          </div>
          <div className="error">
            <p>Error: {error.message}. Please check your connection or try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="education" id="education">
      <div className="content-inner">
        <div className="content-header">
          <h2>Education</h2>
        </div>
        <div className="timeline">
          {educationData.map((edu, index) => {
            const gelar = parseInt(edu.gelar, 10);
            let gelarText = 'Tidak sekolah';

            switch (gelar) {
              case 1: gelarText = 'TK'; break;
              case 2: gelarText = 'SD'; break;
              case 3: gelarText = 'SMP'; break;
              case 4: gelarText = 'SMA/SMK'; break;
              case 5: gelarText = 'S1'; break;
              case 6: gelarText = 'S2'; break;
              case 7: gelarText = 'S3'; break;
              default: gelarText = 'Tidak diketahui'; break;
            }

            // Pilih animasi AOS berdasarkan index
            const animations = ['fade-up', 'fade-down', 'fade-right', 'fade-left', 'flip-up', 'zoom-in'];
            const aosType = animations[index % animations.length];

            return (
              <div 
                key={index} 
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                data-aos={aosType}
              >
                <div className="timeline-content">
                  <span className="edu-date">{edu.tahun_masuk} - {edu.tahun_lulus}</span>
                  <h5>{gelarText}</h5>
                  <h3>{edu.nama_sekolah}</h3>
                  <h4>{edu.jurusan}</h4>
                  <div className="edu-icon">
                    {edu.icon 
                      ? <i className={`icon-${edu.icon}`}></i> 
                      : <i className="icon-graduation-cap"></i> // Default icon jika tidak ada
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
