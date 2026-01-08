/* ===================================
   CASE011 - Utility Functions
   =================================== */

/**
 * Generate a unique case hash
 * @returns {string} Case hash
 */
function generateCaseHash() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const hash = `${timestamp}${random}`.slice(-8).toUpperCase();
    return hash;
}

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string} Formatted date
 */
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Generate timestamp string
 * @returns {string} Timestamp
 */
function generateTimestamp() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `[${hours}:${minutes}:${seconds}]`;
}

/**
 * Sanitize user input
 * @param {string} input - User input
 * @returns {string} Sanitized input
 */
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

/**
 * Count words in text
 * @param {string} text - Text to count
 * @returns {number} Word count
 */
function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Hash string to number (for deterministic random)
 * @param {string} str - String to hash
 * @returns {number} Hash value
 */
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

/**
 * Seeded random number generator
 * @param {number} seed - Seed value
 * @returns {function} Random function
 */
function seededRandom(seed) {
    let state = seed;
    return function() {
        state = (state * 9301 + 49297) % 233280;
        return state / 233280;
    };
}

/**
 * Get random item from array using seed
 * @param {Array} array - Array to pick from
 * @param {number} seed - Seed value
 * @returns {*} Random item
 */
function getRandomItem(array, seed) {
    const random = seededRandom(seed);
    const index = Math.floor(random() * array.length);
    return array[index];
}

/**
 * Shuffle array using seed
 * @param {Array} array - Array to shuffle
 * @param {number} seed - Seed value
 * @returns {Array} Shuffled array
 */
function shuffleArray(array, seed) {
    const random = seededRandom(seed);
    const shuffled = [...array];
    
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
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

/**
 * Show notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-bg-medium);
        border: 2px solid var(--color-accent-cyan);
        padding: 1rem 1.5rem;
        border-radius: 2px;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise} Promise that resolves when copied
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        return false;
    }
}
