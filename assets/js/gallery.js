// gallery.js - Handle gallery rendering, filters, search, sort, modal

// Render gallery items
function renderGallery(items = galleryData) {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = ''; // Clear
    items.forEach(item => {
        const stats = getStats(item.id);
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.dataset.id = item.id;
        div.dataset.category = item.category;
        div.dataset.tags = item.tags.join(',');
        div.dataset.title = item.title.toLowerCase();
        div.dataset.popularity = stats.views + stats.likes;
        div.innerHTML = `
            <img src="\( {item.image}" alt=" \){item.title}" loading="lazy">
            <div class="item-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="item-tags">\( {item.tags.map(tag => `<span class="tag"> \){tag}</span>`).join('')}</div>
                <div class="stats">Views: ${stats.views} | Likes: ${stats.likes}</div>
            </div>
        `;
        div.addEventListener('click', () => openModal(item.id));
        grid.appendChild(div);
    });
}

// Populate filters
function populateFilters() {
    const categories = [...new Set(galleryData.map(item => item.category))];
    const tags = [...new Set(galleryData.flatMap(item => item.tags))];
    
    const catSelect = document.getElementById('category-filter');
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        catSelect.appendChild(option);
    });
    
    const tagSelect = document.getElementById('tag-filter');
    tags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagSelect.appendChild(option);
    });
}

// Filter and sort
function filterGallery() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const tag = document.getElementById('tag-filter').value;
    const sort = document.getElementById('sort-select').value;
    
    let items = galleryData.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(search) || item.description.toLowerCase().includes(search);
        const matchesCat = !category || item.category === category;
        const matchesTag = !tag || item.tags.includes(tag);
        return matchesSearch && matchesCat && matchesTag;
    });
    
    // Sort
    if (sort === 'title-asc') items.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'title-desc') items.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === 'date-desc') items.sort((a, b) => b.id - a.id); // Assuming higher id is newer
    if (sort === 'popularity-desc') items.sort((a, b) => (getStats(b.id).views + getStats(b.id).likes) - (getStats(a.id).views + getStats(a.id).likes));
    
    renderGallery(items);
}

// Open modal
function openModal(id) {
    const item = galleryData.find(i => i.id === id);
    if (!item) return;
    
    incrementViews(id);
    const stats = getStats(id);
    
    document.getElementById('modal-image').src = item.image;
    document.getElementById('modal-image').alt = item.title;
    document.getElementById('modal-title').textContent = item.title;
    document.getElementById('modal-description').textContent = item.description;
    document.getElementById('modal-views').textContent = stats.views;
    document.getElementById('modal-likes').textContent = stats.likes;
    
    // Comments
    const commentList = document.getElementById('comment-list');
    commentList.innerHTML = '';
    getComments(id).forEach(comment => {
        const li = document.createElement('li');
        li.textContent = comment;
        commentList.appendChild(li);
    });
    
    // Buttons
    document.getElementById('like-button').onclick = () => {
        const newLikes = toggleLike(id);
        document.getElementById('modal-likes').textContent = newLikes;
        showToast('Like toggled!');
    };
    document.getElementById('bookmark-button').onclick = () => {
        const bookmarked = toggleBookmark(id);
        showToast(bookmarked ? 'Bookmarked!' : 'Removed bookmark!');
    };
    document.getElementById('share-button').onclick = () => {
        navigator.share({ title: item.title, text: item.description, url: window.location.href });
    };
    document.getElementById('copy-link').onclick = () => {
        navigator.clipboard.writeText(window.location.href + '#item-' + id);
        showToast('Link copied!');
    };
    document.getElementById('add-comment').onclick = () => {
        const comment = document.getElementById('comment-input').value;
        addComment(id, comment);
        openModal(id); // Refresh modal
    };
    
    document.getElementById('modal').style.display = 'flex';
}

// Close modal
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
    filterGallery(); // Refresh gallery stats
});

// Keyboard nav for modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.getElementById('modal').style.display = 'none';
});
