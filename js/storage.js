/* ===================================
   CASE011 - Storage System
   Manage submissions and archive
   =================================== */

const STORAGE_KEY = 'case011_submissions';

/**
 * Save a submission to the archive
 * @param {Object} submission - Submission data
 * @returns {boolean} Success status
 */
function saveSubmission(submission) {
    try {
        const submissions = getSubmissions();

        // Add submission with unique ID
        const submissionWithId = {
            ...submission,
            id: `${submission.caseHash}-${Date.now()}`,
            submittedAt: submission.submittedAt || new Date().toISOString()
        };

        submissions.push(submissionWithId);

        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));

        return true;
    } catch (error) {
        console.error('Failed to save submission:', error);
        return false;
    }
}

/**
 * Get all submissions from archive
 * @returns {Array} List of submissions
 */
function getSubmissions() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load submissions:', error);
        return [];
    }
}

/**
 * Get submissions for a specific case
 * @param {string} caseHash - Case hash
 * @returns {Array} List of submissions for the case
 */
function getSubmissionsByCase(caseHash) {
    const submissions = getSubmissions();
    return submissions.filter(s => s.caseHash === caseHash);
}

/**
 * Get submission by ID
 * @param {string} id - Submission ID
 * @returns {Object|null} Submission data
 */
function getSubmissionById(id) {
    const submissions = getSubmissions();
    return submissions.find(s => s.id === id) || null;
}

/**
 * Delete a submission
 * @param {string} id - Submission ID
 * @returns {boolean} Success status
 */
function deleteSubmission(id) {
    try {
        const submissions = getSubmissions();
        const filtered = submissions.filter(s => s.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Failed to delete submission:', error);
        return false;
    }
}

/**
 * Get archive statistics
 * @returns {Object} Archive stats
 */
function getArchiveStats() {
    const submissions = getSubmissions();

    const uniqueInvestigators = new Set(submissions.map(s => s.investigatorName)).size;
    const uniqueCases = new Set(submissions.map(s => s.caseHash)).size;

    const categoryCounts = {};
    submissions.forEach(s => {
        categoryCounts[s.caseCategory] = (categoryCounts[s.caseCategory] || 0) + 1;
    });

    return {
        totalSubmissions: submissions.length,
        uniqueInvestigators: uniqueInvestigators,
        uniqueCases: uniqueCases,
        categoryCounts: categoryCounts,
        latestSubmission: submissions.length > 0
            ? submissions[submissions.length - 1].submittedAt
            : null
    };
}

/**
 * Export archive as JSON
 * @returns {string} JSON string
 */
function exportArchive() {
    const submissions = getSubmissions();
    return JSON.stringify(submissions, null, 2);
}

/**
 * Import archive from JSON
 * @param {string} jsonData - JSON string
 * @returns {boolean} Success status
 */
function importArchive(jsonData) {
    try {
        const data = JSON.parse(jsonData);
        if (!Array.isArray(data)) {
            throw new Error('Invalid archive format');
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Failed to import archive:', error);
        return false;
    }
}

/**
 * Clear all submissions (with confirmation)
 * @returns {boolean} Success status
 */
function clearArchive() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Failed to clear archive:', error);
        return false;
    }
}

/**
 * Search submissions
 * @param {string} query - Search query
 * @returns {Array} Matching submissions
 */
function searchSubmissions(query) {
    const submissions = getSubmissions();
    const lowerQuery = query.toLowerCase();

    return submissions.filter(s =>
        s.caseName.toLowerCase().includes(lowerQuery) ||
        s.investigatorName.toLowerCase().includes(lowerQuery) ||
        s.conclusion.toLowerCase().includes(lowerQuery) ||
        s.notebook.toLowerCase().includes(lowerQuery)
    );
}

/**
 * Filter submissions by category
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered submissions
 */
function filterByCategory(category) {
    const submissions = getSubmissions();
    return submissions.filter(s => s.caseCategory === category);
}

/**
 * Sort submissions
 * @param {Array} submissions - Submissions to sort
 * @param {string} sortBy - Sort method (recent, oldest, longest)
 * @returns {Array} Sorted submissions
 */
function sortSubmissions(submissions, sortBy) {
    const sorted = [...submissions];

    switch (sortBy) {
        case 'recent':
            sorted.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
            break;
        case 'oldest':
            sorted.sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
            break;
        case 'longest':
            sorted.sort((a, b) => b.wordCount - a.wordCount);
            break;
        default:
            break;
    }

    return sorted;
}

/**
 * Get submission count for a case
 * @param {string} caseHash - Case hash
 * @returns {number} Number of submissions
 */
function getSubmissionCount(caseHash) {
    const submissions = getSubmissionsByCase(caseHash);
    return submissions.length;
}

/**
 * Check if user has submitted for a case
 * @param {string} caseHash - Case hash
 * @param {string} investigatorName - Investigator name
 * @returns {boolean} Has submitted
 */
function hasSubmitted(caseHash, investigatorName) {
    const submissions = getSubmissionsByCase(caseHash);
    return submissions.some(s => s.investigatorName === investigatorName);
}
