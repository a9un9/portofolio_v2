import '../../assets/css/sidebar.css'; // Import file CSS untuk styling

const SideBar = () => {
  return (
    <div className="sidebar">
      <h1 className="sidebar-title">Portofolio</h1>
      <ul className="sidebar-links">
        <li><a href="#experience">Experience</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  );
};

export default SideBar;
