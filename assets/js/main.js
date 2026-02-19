// main.js - Init and global event listeners

document.addEventListener('DOMContentLoaded', () => {
    initStorage();
    populateFilters();
    renderGallery();
    renderDashboard();
    setupEventListeners();
    setupAnimations();
});

// Setup events
function setupEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        const isDark = document.body.classList.contains('dark-mode');
        document.getElementById('theme-toggle').textContent = isDark ? '🌙' : '☀️';
    });
    
    // Hamburger
    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });
    
    // Active links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
    
    // Filters
    document.getElementById('search-input').addEventListener('input', filterGallery);
    document.getElementById('category-filter').addEventListener('change', filterGallery);
    document.getElementById('tag-filter').addEventListener('change', filterGallery);
    document.getElementById('sort-select').addEventListener('change', filterGallery);
    
    // Scroll progress
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';
        
        // Show FAB
        document.getElementById('fab').style.display = winScroll > 300 ? 'block' : 'none';
    });
    
    // Back to top
    document.getElementById('fab').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Render dashboard
function renderDashboard() {
    const { totalItems, totalViews, totalLikes } = getTotalStats();
    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-views').textContent = totalViews;
    document.getElementById('total-likes').textContent = totalLikes;
    
    // Chart
    const { labels, views, likes } = getChartData();
    new Chart(document.getElementById('stats-chart'), {
        type: 'bar',
        data: {
            labels,
            datasets: [
                { label: 'Views', data: views, backgroundColor: 'rgba(0, 255, 255, 0.5)' },
                { label: 'Likes', data: likes, backgroundColor: 'rgba(255, 0, 255, 0.5)' }
            ]
        },
        options: { scales: { y: { beginAtZero: true } } }
    });
}

// Show toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3000);
}

// Setup animations (simple scroll reveal)
function setupAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    });
    
    document.querySelectorAll('section').forEach(sec => observer.observe(sec));
}

// Add to CSS for animation
const style = document.createElement('style');
style.innerHTML = `
    .animate-fadeIn {
        animation: fadeIn 1s ease;
    }
`;
document.head.appendChild(style);

// Skeleton loading (simulate)
const grid = document.getElementById('gallery-grid');
grid.innerHTML = '<div class="skeleton"></div>'.repeat(6); // Initial skeletons
setTimeout(() => renderGallery(), 1000); // Simulate load
