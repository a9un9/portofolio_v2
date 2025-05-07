import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/css/experience.css'; // Custom CSS khusus Experience

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    axios.get('http://localhost:5000/api/pengalaman/client')
      .then(response => {
        setExperienceData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // Fungsi format tanggal ISO ke dd-mm-yyyy
  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (loading) {
    return (
      <section className="experience">
        <div className="content-inner">
          <div className="content-header">
            <h2>Experience</h2>
          </div>
          <div className="loader">Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="experience">
        <div className="content-inner">
          <div className="content-header">
            <h2>Experience</h2>
          </div>
          <div className="error">
            <p>Error: {error.message}. Please check your connection or try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="experience" id="experience">
      <div className="content-inner">
        <div className="content-header">
          <h2>Experience</h2>
        </div>
        <div className="timeline">
          {experienceData.map((exp, index) => {
            const animations = ['fade-up', 'fade-down', 'fade-right', 'fade-left', 'flip-up', 'zoom-in'];
            const aosType = animations[index % animations.length];
            return (
              <div
                key={index}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                data-aos={aosType}
              >
                <div className="timeline-content">
                  <span className="exp-date">
                    {formatDate(exp.tahun_masuk)} - {exp.tahun_keluar ? formatDate(exp.tahun_keluar) : 'Sekarang'}
                  </span>
                  <h5>{exp.posisi}</h5>
                  <h3>{exp.nama_perusahaan}</h3>
                  <h5>
                    {exp.tipe_pengalaman === 2
                      ? "Permanent Staff"
                      : exp.tipe_pengalaman === 1
                      ? "Contract Staff"
                      : exp.tipe_pengalaman === 3
                      ? "Freelance Worker"
                      : ""}
                  </h5>
                  {/* <h4>{exp.deskripsi}</h4> */}
                  {/* <div className="exp-icon">
                    {exp.icon
                      ? <i className={`icon-${exp.icon}`}></i>
                      : <i className="icon-briefcase"></i> // Default icon kerjaan
                    }
                  </div> */}
                  <i className="icon-briefcase"></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
