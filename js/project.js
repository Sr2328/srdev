const projects = [
  {
      id: 1,
      title: " New Pizza Town (Cafe-Website)",
      description: "A full-featured Cafe Website With a menu and order system",
      image: "../IMAGES/project-pizza town.png",
      category: "Frontend",
      demo: "https://new-pizza-town-ui.vercel.app/",
      source: "../assets/ecommerce-website.zip"
  },
  {
      id: 2,
      title: "Festi-(Event-Website)",
      description: "A full-featured Event Website with a booking system",
      image: "../IMAGES/festi-2.png",
      category: "frontend",
      demo: "https://festi.social/events",
      source: "https://github.com/yourusername/portfolio"
  },
  {
      id: 3,
      title: "Real-Estate Website - (Joginder Properties)",
      description: "Real-Estate Website with a property listing and booking system",
      image: "../IMAGES/logo-prop-2.png",
      category: "Frontend",
      demo: "https://masterdev23.github.io/real-estate-joginder/",
      source: "https://github.com/yourusername/weather-app"
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

