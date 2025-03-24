document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery-scroll');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  let currentIndex = 0;
  const itemWidth = galleryItems[0].offsetWidth + 32; // width + gap
  const totalItems = galleryItems.length;

  // Initialize gallery position
  updateGalleryPosition();

  nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateGalleryPosition();
  });

  prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateGalleryPosition();
  });

  function updateGalleryPosition() {
      const position = -currentIndex * itemWidth;
      gallery.style.transform = `translateX(${position}px)`;
  }

  // Add touch support for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  gallery.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
  });

  gallery.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
  });

  function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
              // Swipe left
              nextBtn.click();
          } else {
              // Swipe right
              prevBtn.click();
          }
      }
  }
});