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
// Sample article data (you can replace this with your actual data or API call)
const articles = [
    {
        id: 1,
        title: "Understanding JavaScript Promises",
        excerpt: "A deep dive into asynchronous JavaScript and Promise handling...",
        category: "Development",
        date: "2024-04-15",
        readTime: "6 min read",
        image: "../IMAGES/java promises.jpeg",
        popular: 156
    },
    {
        id: 1,
        title: "Understanding JavaScript Promises",
        excerpt: "A deep dive into asynchronous JavaScript and Promise handling...",
        category: "Development",
        date: "2024-04-15",
        readTime: "6 min read",
        image: "../IMAGES/java promises.jpeg",
        popular: 156
    },
    {
        id: 1,
        title: "Understanding JavaScript Promises",
        excerpt: "A deep dive into asynchronous JavaScript and Promise handling...",
        category: "Development",
        date: "2024-04-15",
        readTime: "6 min read",
        image: "../IMAGES/java promises.jpeg",
        popular: 156
    },
    {
        id: 2,
        title: "CSS Grid Layout Mastery",
        excerpt: "Master the power of CSS Grid for modern web layouts...",
        category: "Design",
        date: "2024-04-14",
        readTime: "8 min read",
        image: "../IMAGES/article2.jpg",
        popular: 234
    },
    // Add more articles here
];

// Articles per page
const ARTICLES_PER_PAGE = 6;
let currentPage = 1;
let currentSort = 'newest';
let filteredArticles = [...articles];

// Initialize articles grid
function initArticlesGrid() {
    const articlesWrapper = document.querySelector('.articles-wrapper');
    const sortSelect = document.getElementById('sortArticles');
    
    // Sort change handler
    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        currentPage = 1;
        sortAndRenderArticles();
    });

    // Initial render
    sortAndRenderArticles();
    updatePagination();
}

// Sort and render articles
function sortAndRenderArticles() {
    sortArticles();
    renderArticles();
    updatePagination();
}

// Sort articles based on selected option
function sortArticles() {
    switch(currentSort) {
        case 'newest':
            filteredArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            filteredArticles.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'popular':
            filteredArticles.sort((a, b) => b.popular - a.popular);
            break;
    }
}

// Render articles
function renderArticles() {
    const articlesWrapper = document.querySelector('.articles-wrapper');
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    const currentArticles = filteredArticles.slice(startIndex, endIndex);

    articlesWrapper.innerHTML = '';

    currentArticles.forEach((article, index) => {
        const articleCard = `
            <article class="article-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="card-image">
                    <img src="${article.image}" alt="${article.title}">
                    <span class="category">${article.category}</span>
                </div>
                <div class="card-content">
                    <div class="meta">
                        <span><i class="far fa-calendar"></i> ${formatDate(article.date)}</span>
                        <span><i class="far fa-clock"></i> ${article.readTime}</span>
                        <span><i class="far fa-eye"></i> ${article.popular} views</span>
                    </div>
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                    <a href="#" class="read-more">Read Article <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>
        `;
        articlesWrapper.insertAdjacentHTML('beforeend', articleCard);
    });
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
    const pageNumbers = document.querySelector('.page-numbers');
    const prevBtn = document.querySelector('.prev-page');
    const nextBtn = document.querySelector('.next-page');

    // Update page numbers
    pageNumbers.innerHTML = '';
    for(let i = 1; i <= totalPages; i++) {
        pageNumbers.innerHTML += `
            <span class="${i === currentPage ? 'active' : ''}">${i}</span>
        `;
    }

    // Add click events to page numbers
    pageNumbers.querySelectorAll('span').forEach(span => {
        span.addEventListener('click', () => {
            currentPage = parseInt(span.textContent);
            sortAndRenderArticles();
        });
    });

    // Update navigation buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    // Add click events to navigation buttons
    prevBtn.onclick = () => {
        if(currentPage > 1) {
            currentPage--;
            sortAndRenderArticles();
        }
    };

    nextBtn.onclick = () => {
        if(currentPage < totalPages) {
            currentPage++;
            sortAndRenderArticles();
        }
    };
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Initialize when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true
    });
    initArticlesGrid();
});