// storage.js - Handle localStorage for likes, views, comments, bookmarks

// Initialize storage if not exists
function initStorage() {
    if (!localStorage.getItem('galleryStats')) {
        localStorage.setItem('galleryStats', JSON.stringify({}));
    }
    if (!localStorage.getItem('comments')) {
        localStorage.setItem('comments', JSON.stringify({}));
    }
    if (!localStorage.getItem('bookmarks')) {
        localStorage.setItem('bookmarks', JSON.stringify([]));
    }
}

// Get stats for an item
function getStats(id) {
    const stats = JSON.parse(localStorage.getItem('galleryStats')) || {};
    return stats[id] || { views: 0, likes: 0 };
}

// Update views
function incrementViews(id) {
    const stats = JSON.parse(localStorage.getItem('galleryStats')) || {};
    if (!stats[id]) stats[id] = { views: 0, likes: 0 };
    stats[id].views++;
    localStorage.setItem('galleryStats', JSON.stringify(stats));
}

// Toggle like
function toggleLike(id) {
    const stats = JSON.parse(localStorage.getItem('galleryStats')) || {};
    if (!stats[id]) stats[id] = { views: 0, likes: 0 };
    stats[id].likes = stats[id].likes > 0 ? 0 : 1; // Simple toggle 0/1 per user
    localStorage.setItem('galleryStats', JSON.stringify(stats));
    return stats[id].likes;
}

// Add comment (basic anti-XSS)
function addComment(id, comment) {
    if (!comment.trim()) return;
    const escapedComment = comment.replace(/</g, '&lt;').replace(/>/g, '&gt;'); // Escape HTML
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    if (!comments[id]) comments[id] = [];
    comments[id].push(escapedComment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

// Get comments
function getComments(id) {
    const comments = JSON.parse(localStorage.getItem('comments')) || {};
    return comments[id] || [];
}

// Toggle bookmark
function toggleBookmark(id) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    if (bookmarks.includes(id)) {
        bookmarks = bookmarks.filter(b => b !== id);
    } else {
        bookmarks.push(id);
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    return bookmarks.includes(id);
}

// Get total stats for dashboard
function getTotalStats() {
    const stats = JSON.parse(localStorage.getItem('galleryStats')) || {};
    let totalViews = 0, totalLikes = 0;
    Object.values(stats).forEach(s => {
        totalViews += s.views;
        totalLikes += s.likes;
    });
    return { totalItems: galleryData.length, totalViews, totalLikes };
}

// Get chart data
function getChartData() {
    const stats = JSON.parse(localStorage.getItem('galleryStats')) || {};
    const labels = galleryData.map(item => item.title);
    const views = galleryData.map(item => stats[item.id]?.views || 0);
    const likes = galleryData.map(item => stats[item.id]?.likes || 0);
    return { labels, views, likes };
}
