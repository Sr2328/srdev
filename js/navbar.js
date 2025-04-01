document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-links li');

  hamburger.addEventListener('click', () => {
      // Toggle nav
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');

      
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
      }
  });
});