/* ===================================
   CASE011 - Shared Archive System
   GitHub Gist-based community archive
   =================================== */

// GitHub Gist configuration (public, read-only)
const SHARED_ARCHIVE_GIST_ID = 'YOUR_GIST_ID_HERE'; // Users can create their own
const SHARED_ARCHIVE_URL = `https://gist.githubusercontent.com/raw/${SHARED_ARCHIVE_GIST_ID}/archive.json`;

// Fallback: Use a demo archive hosted on GitHub Pages
const DEMO_ARCHIVE_URL = 'https://raw.githubusercontent.com/case011/archive/main/submissions.json';

/**
 * Fetch shared archive from GitHub
 * @returns {Promise<Array>} Shared submissions
 */
async function fetchSharedArchive() {
    try {
        // Try custom Gist first
        if (SHARED_ARCHIVE_GIST_ID !== 'YOUR_GIST_ID_HERE') {
            const response = await fetch(SHARED_ARCHIVE_URL);
            if (response.ok) {
                const data = await response.json();
                return Array.isArray(data) ? data : [];
            }
        }

        // Fallback to demo archive (or return empty)
        return [];
    } catch (error) {
        console.error('Failed to fetch shared archive:', error);
        return [];
    }
}

/**
 * Get combined archive (local + shared)
 * @returns {Promise<Object>} Combined archive data
 */
async function getCombinedArchive() {
    const localSubmissions = getSubmissions(); // From storage.js
    const sharedSubmissions = await fetchSharedArchive();

    // Mark submissions with source
    const local = localSubmissions.map(s => ({ ...s, source: 'local' }));
    const shared = sharedSubmissions.map(s => ({ ...s, source: 'shared' }));

    // Combine and deduplicate
    const combined = [...shared, ...local];
    const unique = deduplicateSubmissions(combined);

    return {
        all: unique,
        local: local,
        shared: shared,
        stats: {
            total: unique.length,
            local: local.length,
            shared: shared.length
        }
    };
}

/**
 * Deduplicate submissions by ID
 * @param {Array} submissions - Submissions array
 * @returns {Array} Deduplicated submissions
 */
function deduplicateSubmissions(submissions) {
    const seen = new Set();
    return submissions.filter(s => {
        const key = `${s.caseHash}-${s.submittedAt}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

/**
 * Export archive for sharing
 * @returns {string} JSON string for sharing
 */
function exportArchiveForSharing() {
    const submissions = getSubmissions();

    // Create shareable format
    const shareableData = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        platform: 'Case011',
        submissions: submissions.map(s => ({
            caseHash: s.caseHash,
            caseName: s.caseName,
            caseCategory: s.caseCategory,
            investigatorName: s.investigatorName,
            conclusion: s.conclusion,
            notebook: s.notebook,
            submittedAt: s.submittedAt,
            wordCount: s.wordCount
        }))
    };

    return JSON.stringify(shareableData, null, 2);
}

/**
 * Download archive as JSON file
 */
function downloadArchive() {
    const jsonData = exportArchiveForSharing();
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `case011_archive_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * Import archive from JSON file
 * @param {File} file - JSON file
 * @returns {Promise<boolean>} Success status
 */
async function importArchiveFromFile(file) {
    try {
        const text = await file.text();
        const data = JSON.parse(text);

        if (!data.submissions || !Array.isArray(data.submissions)) {
            throw new Error('Invalid archive format');
        }

        // Merge with existing submissions
        const existing = getSubmissions();
        const imported = data.submissions;

        // Add imported submissions that don't exist locally
        const existingKeys = new Set(existing.map(s => `${s.caseHash}-${s.submittedAt}`));
        const newSubmissions = imported.filter(s => {
            const key = `${s.caseHash}-${s.submittedAt}`;
            return !existingKeys.has(key);
        });

        // Save merged data
        const merged = [...existing, ...newSubmissions];
        localStorage.setItem('case011_submissions', JSON.stringify(merged));

        return true;
    } catch (error) {
        console.error('Failed to import archive:', error);
        return false;
    }
}

/**
 * Generate shareable link for submission
 * @param {Object} submission - Submission object
 * @returns {string} Shareable URL
 */
function generateShareableLink(submission) {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
        hash: submission.caseHash,
        view: 'submission',
        id: submission.id || `${submission.caseHash}-${submission.submittedAt}`
    });
    return `${baseUrl}/archive.html?${params.toString()}`;
}

/**
 * Create a new AI-generated case based on a topic
 * @param {string} topic - Mystery topic
 * @returns {Promise<string>} New case hash
 */
async function createNewAICase(topic) {
    const newHash = generateCaseHash();

    // Store the topic for this hash
    localStorage.setItem(`case_topic_${newHash}`, topic);

    return newHash;
}

/**
 * Submit to shared archive (GitHub Gist)
 * Instructions for manual submission
 */
function getGitHubSubmissionInstructions(submission) {
    const instructions = `
# How to Submit to Shared Archive

Since this is a static website, submissions to the shared archive require a GitHub account.

## Option 1: Create Your Own Gist (Recommended)

1. Go to https://gist.github.com
2. Create a new Gist named "case011-archive.json"
3. Paste your exported archive JSON
4. Make it public
5. Copy the Gist ID from the URL
6. Share the Gist ID with the community

## Option 2: Submit via GitHub Repository

1. Fork the Case011 archive repository
2. Add your submission to submissions.json
3. Create a pull request
4. Your submission will be reviewed and merged

## Option 3: Export and Share Locally

1. Click "Export Archive" button
2. Share the JSON file with friends
3. They can import it using "Import Archive"

---

Your submission data:
Case: ${submission.caseName}
Investigator: ${submission.investigatorName}
Date: ${formatDate(new Date(submission.submittedAt))}
    `.trim();

    return instructions;
}

/**
 * Check if archive sync is available
 * @returns {Promise<boolean>} Sync availability
 */
async function checkArchiveSyncAvailability() {
    try {
        const response = await fetch(SHARED_ARCHIVE_URL, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
}

/**
 * Sync local archive with shared archive
 * @returns {Promise<Object>} Sync result
 */
async function syncArchive() {
    try {
        const sharedSubmissions = await fetchSharedArchive();
        const localSubmissions = getSubmissions();

        // Find new submissions from shared archive
        const localKeys = new Set(localSubmissions.map(s => `${s.caseHash}-${s.submittedAt}`));
        const newFromShared = sharedSubmissions.filter(s => {
            const key = `${s.caseHash}-${s.submittedAt}`;
            return !localKeys.has(key);
        });

        if (newFromShared.length > 0) {
            // Add new submissions to local storage
            const merged = [...localSubmissions, ...newFromShared];
            localStorage.setItem('case011_submissions', JSON.stringify(merged));
        }

        return {
            success: true,
            newSubmissions: newFromShared.length,
            total: localSubmissions.length + newFromShared.length
        };
    } catch (error) {
        console.error('Sync failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}
