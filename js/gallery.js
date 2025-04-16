document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Filter functionality
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          // Add active class to clicked button
          button.classList.add('active');

          const filterValue = button.getAttribute('data-filter');

          galleryItems.forEach(item => {
              // Show all items if 'all' is selected
              if (filterValue === 'all') {
                  item.style.opacity = '1';
                  item.style.transform = 'scale(1)';
                  item.style.display = 'block';
                  
                  setTimeout(() => {
                      item.style.opacity = '1';
                      item.style.transform = 'scale(1)';
                  }, 0);
              } 
              // Show/hide items based on category
              else {
                  if (item.getAttribute('data-category') === filterValue) {
                      item.style.display = 'block';
                      setTimeout(() => {
                          item.style.opacity = '1';
                          item.style.transform = 'scale(1)';
                      }, 0);
                  } else {
                      item.style.opacity = '0';
                      item.style.transform = 'scale(0.8)';
                      setTimeout(() => {
                          item.style.display = 'none';
                      }, 300);
                  }
              }
          });
      });
  });

  // Add animation on scroll
  const observerOptions = {
      threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, observerOptions);

  galleryItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      observer.observe(item);
  });
});
// this  is lightbox.js//
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeLightbox = lightbox.querySelector('.close-lightbox');

    // Open lightbox when gallery image is clicked
    document.querySelectorAll('.gallery-item img').forEach(image => {
        image.addEventListener('click', () => {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxCaption.textContent = image.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close lightbox when clicking close button
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});