// Sample article data (replace with your actual articles)
const articles = [
    {
        id: 1,
        title: "Building Responsive Websites with Modern CSS",
        excerpt: "Learn how to create beautiful, responsive websites using modern CSS techniques...",
        category: "development",
        date: "Apr 15, 2024",
        readTime: "8 min read",
        image: "../IMAGES/Pink Beige and Black Creative Portfolio Animated Presentation-GIF2.gif"
    },
    {
        id: 2,
        title: "UI/UX Design Principles",
        excerpt: "Learn how to create beautiful, responsive websites using modern CSS techniques...",
        category: "design",
        date: "Apr 15, 2024",
        readTime: "8 min read",
        image: "../IMAGES/developer-png-9wxnnbpbatv5o2dn.png"
    }
    // Add more articles as needed
];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.search-bar button');
    const filterTags = document.querySelectorAll('.filter-tags .tag');
    const featuredGrid = document.querySelector('.featured-grid');
    
    let currentFilter = 'all';

    // Function to create article HTML
    function createArticleHTML(article) {
        return `
            <article class="featured-card" data-aos="fade-up" data-category="${article.category}">
                <div class="card-image">
                    <img src="${article.image}" alt="${article.title}">
                    <span class="category">${article.category}</span>
                </div>
                <div class="card-content">
                    <div class="meta">
                        <span><i class="far fa-calendar"></i> ${article.date}</span>
                        <span><i class="far fa-clock"></i> ${article.readTime}</span>
                    </div>
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                    <a href="#" class="read-more">Read Article <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>
        `;
    }

    // Function to filter and search articles
    function filterAndSearchArticles() {
        const searchTerm = searchInput.value.toLowerCase();
        let filteredArticles = articles;

        // Filter by category
        if (currentFilter !== 'all') {
            filteredArticles = filteredArticles.filter(article => 
                article.category.toLowerCase() === currentFilter
            );
        }

        // Filter by search term
        if (searchTerm) {
            filteredArticles = filteredArticles.filter(article =>
                article.title.toLowerCase().includes(searchTerm) ||
                article.excerpt.toLowerCase().includes(searchTerm) ||
                article.category.toLowerCase().includes(searchTerm)
            );
        }

        // Clear and render filtered articles
        featuredGrid.innerHTML = filteredArticles.length ? 
            filteredArticles.map(createArticleHTML).join('') :
            '<div class="no-results">No articles found matching your criteria</div>';

        // Reinitialize AOS for new elements
        AOS.refresh();
    }

    // Search input event listener with debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterAndSearchArticles, 300);
    });

    // Search button click event
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        filterAndSearchArticles();
    });

    // Filter tags click event
    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Update active tag
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            // Update current filter and apply filtering
            currentFilter = tag.getAttribute('data-filter');
            filterAndSearchArticles();
        });
    });

    // Initialize with all articles
    filterAndSearchArticles();
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
        image: "../IMAGES/article1.jpg",
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