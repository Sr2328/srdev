const projects = [
  {
      id: 1,
      title: "E-commerce Website",
      description: "A full-featured online shopping platform built with React and Node.js",
      image: "../IMAGES/Pink Beige and Black Creative Portfolio Animated Presentation-GIF2.gif",
      category: "fullstack",
      demo: "https://demo-link.com",
      source: "../assets/ecommerce-website.zip"
  },
  {
      id: 2,
      title: "Portfolio Website",
      description: "Modern portfolio website built with HTML, CSS, and JavaScript",
      image: "../IMAGES/Pink Beige and Black Creative Portfolio Animated Presentation-GIF2.gif",
      category: "frontend",
      demo: "https://your-portfolio-url.com",
      source: "https://github.com/yourusername/portfolio"
  },
  {
      id: 3,
      title: "Weather Dashboard",
      description: "Real-time weather application using OpenWeather API and React",
      image: "../IMAGES/Pink Beige and Black Creative Portfolio Animated Presentation-GIF2.gif",
      category: "react",
      demo: "https://weather-dashboard-demo.com",
      source: "https://github.com/yourusername/weather-app"
  },
  {
      id: 4,
      title: "Task Management App",
      description: "Full-stack task management application with authentication",
      image: "../IMAGES/Pink Beige and Black Creative Portfolio Animated Presentation-GIF2.gif",
      category: "fullstack",
      demo: "https://task-manager-demo.com",
      source: "https://github.com/yourusername/task-manager"
  },
 
  // You can continue adding more projects following the same structure
];

document.addEventListener('DOMContentLoaded', () => {
  const projectsGrid = document.querySelector('.projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Initialize projects
  displayProjects('all');

  // Filter button click handlers
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          const category = button.getAttribute('data-filter');
          
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          // Display filtered projects
          displayProjects(category);
      });
  });

  function displayProjects(category) {
      const filteredProjects = category === 'all' 
          ? projects 
          : projects.filter(project => project.category === category);

      projectsGrid.innerHTML = filteredProjects.map(project => `
          <div class="project-card" data-category="${project.category}">
              <img src="${project.image}" alt="${project.title}" class="project-image">
              <div class="project-info">
                  <h3 class="project-title">${project.title}</h3>
                  <p class="project-description">${project.description}</p>
                  <div class="project-links">
                      <a href="${project.demo}" target="_blank" class="project-link">
                          <i class="fas fa-external-link-alt"></i> Live Demo
                      </a>
                      <a href="${project.source}" target="_blank" class="project-link">
                          <i class="fab fa-github"></i> Source Code
                      </a>
                  </div>
              </div>
          </div>
      `).join('');
  }

  // Add scroll animation
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
          }
      });
  });

  document.querySelectorAll('.project-card').forEach((card) => {
      observer.observe(card);
  });
});

