document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const filterTags = document.querySelectorAll('.filter-tags .tag');
    const articles = document.querySelectorAll('.featured-card');
    const articlesGrid = document.querySelector('.featured-grid');
    let currentFilter = 'all';
    let filteredArticles = [...articles];

    function searchArticles(searchTerm) {
        const searchString = searchTerm.toLowerCase();
        
        filteredArticles = Array.from(articles).filter(article => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            const description = article.querySelector('p').textContent.toLowerCase();
            const category = article.querySelector('.category').textContent.toLowerCase();

            return (title.includes(searchString) || 
                    description.includes(searchString) || 
                    category.includes(searchString)) &&
                   (currentFilter === 'all' || category === currentFilter);
        });

        renderArticles();
    }

    function filterArticles(category) {
        currentFilter = category.toLowerCase();
        
        filteredArticles = Array.from(articles).filter(article => {
            const articleCategory = article.querySelector('.category').textContent.toLowerCase();
            const searchTerm = searchInput.value.toLowerCase();
            const matchesSearch = !searchTerm || 
                article.querySelector('h3').textContent.toLowerCase().includes(searchTerm) ||
                article.querySelector('p').textContent.toLowerCase().includes(searchTerm);

            return (category === 'all' || articleCategory === category) && matchesSearch;
        });

        renderArticles();
    }

    function renderArticles() {
        // Hide all articles first
        articles.forEach(article => {
            article.style.display = 'none';
        });

        // Remove existing no results message if present
        const existingNoResults = document.querySelector('.no-results');
        if (existingNoResults) {
            existingNoResults.remove();
        }

        if (filteredArticles.length === 0) {
            // Show no results message
            const noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results';
            noResultsMsg.innerHTML = `
                <i class="fas fa-search"></i>
                <h3>No articles found</h3>
                <p>Try adjusting your search or filter to find what you're looking for.</p>
            `;
            articlesGrid.appendChild(noResultsMsg);
        } else {
            // Show filtered articles
            filteredArticles.forEach(article => {
                article.style.display = 'block';
            });
        }

        // Reinitialize AOS for newly visible elements
        AOS.refresh();
    }

    function updateActiveTag(selectedTag) {
        filterTags.forEach(tag => {
            tag.classList.remove('active');
        });
        selectedTag.classList.add('active');
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Event Listeners
    searchInput.addEventListener('input', debounce((e) => {
        searchArticles(e.target.value);
    }, 300));

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const category = tag.getAttribute('data-filter');
            updateActiveTag(tag);
            filterArticles(category);
        });
    });

    // Reset button functionality
    const resetFilters = () => {
        searchInput.value = '';
        currentFilter = 'all';
        filteredArticles = [...articles];
        const allTag = document.querySelector('[data-filter="all"]');
        updateActiveTag(allTag);
        renderArticles();
    };

    // Add reset button if needed
    const resetButton = document.createElement('button');
    resetButton.className = 'reset-filters';
    resetButton.innerHTML = '<i class="fas fa-redo"></i> Reset Filters';
    document.querySelector('.filter-tags').appendChild(resetButton);
    resetButton.addEventListener('click', resetFilters);

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Initial render
    renderArticles();
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
    title: "5 UI Tricks to Instantly Improve UX",
    excerpt: "Learn how to enhance user experience instantly with these five simple UI techniques: Hover Effects, Soft Shadows, Skeleton Loaders, Micro Animations, and Focus States.",
    category: "UX Design",
    date: "2025-05-12",
    readTime: "3 min read",
    image: "../IMAGES/blog-img-1.jpg",
    popular: 0
},
{
    id: 2,
    title: "10 Free Tools Every Frontend Developer Should Bookmark in 2025",
    excerpt: "From debugging tricky CSS issues to compressing images and previewing animations — these free tools can help streamline your frontend workflow.",
    category: "Frontend",
    date: "2025-04-21",
    readTime: "3 min read",
    image: "../IMAGES/blog-img-2.png",
    popular: 0
},
{
    id: 3,
    title: "Write Clean & Efficient JavaScript: Lessons from Real Projects",
    excerpt: "Learn how to structure, optimize, and refactor your JavaScript code using real-world examples — perfect for beginners and pros alike.",
    category: "JavaScript",
    date: "2025-04-23",
    readTime: "4 min read",
    image: "../IMAGES/blog-img-3.webp",
    popular: 0
}

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