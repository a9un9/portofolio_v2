import React, { useState } from 'react';
import '../assets/css/style2.css'; // pastikan sudah ada css untuk styling

const projectList = [
  { id: 1, title: 'Project One', description: 'Design project', category: 'Design' },
  { id: 2, title: 'Project Two', description: 'Web development project', category: 'Development' },
  { id: 3, title: 'Project Three', description: 'Marketing project', category: 'Marketing' },
  { id: 4, title: 'Project Four', description: 'Another web design project', category: 'Design' },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('*'); // default show all projects

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  // Filter the projects based on selected category
  const filteredProjects = selectedCategory === '*'
    ? projectList
    : projectList.filter((project) => project.category === selectedCategory);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>

        {/* Filter Buttons */}
        <div className="portfolio-filters">
          <ul id="portfolio-flters">
            <li
              className={selectedCategory === '*' ? 'filter-active' : ''}
              onClick={() => handleFilterChange('*')}
            >
              All
            </li>
            <li
              className={selectedCategory === 'SIMRS' ? 'filter-active' : ''}
              onClick={() => handleFilterChange('SIMRS')}
            >
              SIMRS
            </li>
            <li
              className={selectedCategory === 'EMR' ? 'filter-active' : ''}
              onClick={() => handleFilterChange('EMR')}
            >
              EMR
            </li>
            <li
              className={selectedCategory === 'Freelance' ? 'filter-active' : ''}
              onClick={() => handleFilterChange('Freelance')}
            >
              Freelance
            </li>
          </ul>
        </div>

        {/* Project Grid */}
        <div className="project-grid">
          {filteredProjects.map((project) => (
            <div className={`project-card ${project.category.toLowerCase()}`} key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
