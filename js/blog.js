document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
      duration: 800,
      once: true
  });

  const searchInput = document.getElementById('searchInput');
  const articles = document.querySelectorAll('.featured-card, .article-card');
  const filterTags = document.querySelectorAll('.tag');
  let currentFilter = 'all';

  // Search functionality
  searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase().trim();
      
      articles.forEach(article => {
          const title = article.querySelector('h3').textContent.toLowerCase();
          const description = article.querySelector('p').textContent.toLowerCase();
          const category = article.querySelector('.category').textContent.toLowerCase();
          
          const matchesSearch = title.includes(searchTerm) || 
                              description.includes(searchTerm) || 
                              category.includes(searchTerm);
          
          const matchesFilter = currentFilter === 'all' || 
                              article.querySelector('.category').textContent.toLowerCase() === currentFilter;

          article.style.display = (matchesSearch && matchesFilter) ? 'block' : 'none';

          // Add fade effect
          if (matchesSearch && matchesFilter) {
              article.style.opacity = '1';
              article.style.transform = 'translateY(0)';
          } else {
              article.style.opacity = '0';
              article.style.transform = 'translateY(20px)';
          }
      });
  });

  // Filter functionality
  filterTags.forEach(tag => {
      tag.addEventListener('click', function() {
          const filter = this.getAttribute('data-filter');
          currentFilter = filter;
          
          // Update active tag
          filterTags.forEach(t => t.classList.remove('active'));
          this.classList.add('active');

          // Filter articles
          articles.forEach(article => {
              const category = article.querySelector('.category').textContent.toLowerCase();
              const matchesFilter = filter === 'all' || category === filter;
              const matchesSearch = article.style.display !== 'none';

              article.style.display = (matchesFilter && matchesSearch) ? 'block' : 'none';

              // Add fade effect
              if (matchesFilter && matchesSearch) {
                  article.style.opacity = '1';
                  article.style.transform = 'translateY(0)';
              } else {
                  article.style.opacity = '0';
                  article.style.transform = 'translateY(20px)';
              }
          });
      });
  });
});
// Add this to your existing blog.js file  this is pagination js//
function initPagination() {
  const prevButton = document.querySelector('.prev-page');
  const nextButton = document.querySelector('.next-page');
  const pageNumbers = document.querySelectorAll('.page-numbers span');
  let currentPage = 1;

  // Update active state
  function updatePagination() {
      pageNumbers.forEach(num => {
          num.classList.remove('active');
          if (parseInt(num.textContent) === currentPage) {
              num.classList.add('active');
          }
      });

      // Update button states
      prevButton.classList.toggle('disabled', currentPage === 1);
      nextButton.classList.toggle('disabled', currentPage === pageNumbers.length);
  }

  // Event listeners
  prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
          currentPage--;
          updatePagination();
      }
  });

  nextButton.addEventListener('click', () => {
      if (currentPage < pageNumbers.length) {
          currentPage++;
          updatePagination();
      }
  });

  pageNumbers.forEach(num => {
      num.addEventListener('click', () => {
          currentPage = parseInt(num.textContent);
          updatePagination();
      });
  });

  // Initialize
  updatePagination();
}

// Call the function when document is loaded
document.addEventListener('DOMContentLoaded', () => {
  initPagination();
});