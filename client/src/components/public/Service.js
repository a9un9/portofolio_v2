import '../../assets/css/service.css';

const Service = () => {
  return (
    <section id="services" className="services">
      <h2>My Services</h2>
      <div className="service-cards">
        <div className="service-card">
          <h3>Web Development</h3>
          <p>I build responsive and modern websites.</p>
        </div>
        <div className="service-card">
          <h3>UI/UX Design</h3>
          <p>I create user-friendly interfaces and designs.</p>
        </div>
        <div className="service-card">
          <h3>Consulting</h3>
          <p>I provide web development consulting and guidance.</p>
        </div>
      </div>
    </section>
  );
};

export default Service;
