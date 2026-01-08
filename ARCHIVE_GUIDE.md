# Case011 - Shared Archive System Guide

## Overview

The Case011 archive system allows users to **save, share, and access solved cases** from the community. It's completely **free, secure, and requires no backend server**.

---

## How It Works

### Storage Methods

1. **Local Storage (Default)**
   - Saves to your browser's localStorage
   - Only visible on your device
   - Instant and always available
   - No internet required

2. **Export/Import (Sharing)**
   - Export archive as JSON file
   - Share file with friends
   - Import others' archives
   - Merge with your local archive

3. **GitHub Gist (Optional Shared Archive)**
   - Free public storage
   - Anyone can read
   - Community-accessible
   - Requires GitHub account to create

---

## Features

### 1. View All Solved Cases

**Archive Page**: `archive.html`

- Browse all submitted investigations
- Filter by category (Cryptographic, Historical, etc.)
- Sort by date or length
- Search by keywords
- View full investigation details

### 2. Export Your Archive

**Button**: "EXPORT ARCHIVE"

- Downloads a JSON file with all your submissions
- File format: `case011_archive_YYYY-MM-DD.json`
- Can be shared with anyone
- Includes all investigation notes and conclusions

### 3. Import Others' Archives

**Button**: "IMPORT ARCHIVE"

- Upload a JSON file from someone else
- Automatically merges with your local archive
- Removes duplicates
- Preserves all original data

### 4. Sync with Shared Archive

**Button**: "SYNC"

- Fetches submissions from GitHub Gist (if configured)
- Adds new submissions to your local archive
- Shows how many new submissions were added
- Falls back to local-only if sync fails

### 5. Generate New AI Cases

**Button**: "NEW AI CASE"

- Prompts you to enter a mystery topic
- AI generates a unique case about that topic
- Redirects to investigation page with AI mode enabled
- Examples:
  - Bermuda Triangle
  - Cicada 3301
  - MH370 disappearance
  - Any unsolved mystery

### 6. Reopen Cases

**Two Options**:

1. **REOPEN CASE** - Uses original template
2. **REOPEN WITH AI** - Generates AI-enhanced version

---

## How to Share Your Archive

### Method 1: Export and Send File

1. Go to Archive page
2. Click "EXPORT ARCHIVE"
3. Share the downloaded JSON file via:
   - Email
   - Cloud storage (Google Drive, Dropbox)
   - Messaging apps
   - USB drive

### Method 2: GitHub Gist (Public Archive)

1. Export your archive
2. Go to https://gist.github.com
3. Create new Gist:
   - Filename: `case011-archive.json`
   - Content: Paste your exported JSON
   - Make it **Public**
4. Copy the Gist ID from URL
5. Share the Gist ID with community

**Example Gist URL**:
```
https://gist.github.com/username/abc123def456
                                  ↑ This is the Gist ID
```

### Method 3: GitHub Repository

For larger communities:

1. Create a GitHub repository
2. Add `submissions.json` file
3. Users can submit via Pull Requests
4. Moderators review and merge

---

## How to Access Shared Archives

### Import from File

1. Get JSON file from friend
2. Go to Archive page
3. Click "IMPORT ARCHIVE"
4. Select the JSON file
5. Archive merges automatically

### Sync from GitHub Gist

1. Configure Gist ID in `js/sharedArchive.js`:
   ```javascript
   const SHARED_ARCHIVE_GIST_ID = 'your-gist-id-here';
   ```
2. Click "SYNC" button on Archive page
3. New submissions download automatically

---

## Archive Data Format

### JSON Structure

```json
{
  "version": "1.0",
  "exportedAt": "2026-01-08T21:00:00.000Z",
  "platform": "Case011",
  "submissions": [
    {
      "caseHash": "A7B3C9D2",
      "caseName": "The Voynich Manuscript",
      "caseCategory": "cryptographic",
      "investigatorName": "Detective Smith",
      "conclusion": "Based on my analysis...",
      "notebook": "Investigation notes here...",
      "submittedAt": "2026-01-08T20:30:00.000Z",
      "wordCount": 450
    }
  ]
}
```

### Fields Explained

- **caseHash**: Unique case identifier
- **caseName**: Mystery title
- **caseCategory**: Type of mystery
- **investigatorName**: Who solved it
- **conclusion**: Final theory (50-500 chars)
- **notebook**: Full investigation notes
- **submittedAt**: Timestamp
- **wordCount**: Length of notes

---

## Security & Privacy

### What's Stored Locally?

- Your investigation notes
- Your submissions
- Imported archives from others
- Case preferences

### What's Shared?

When you export/share:
- Case details
- Your investigator name
- Your conclusions and notes
- Submission timestamps

**NOT shared**:
- Browser data
- IP address
- Personal information
- Login credentials (none required!)

### Is It Safe?

✓ **No server** - Everything runs in your browser
✓ **No login** - No passwords to steal
✓ **No tracking** - No analytics or cookies
✓ **Open source** - All code is visible
✓ **Your control** - You choose what to share

---

## Advanced: Setting Up Shared Archive

### Option 1: GitHub Gist (Easiest)

1. Create a GitHub account (free)
2. Go to https://gist.github.com
3. Create new Gist:
   - Filename: `archive.json`
   - Content: `[]` (empty array)
   - Make it Public
4. Copy Gist ID
5. Edit `js/sharedArchive.js`:
   ```javascript
   const SHARED_ARCHIVE_GIST_ID = 'YOUR_GIST_ID';
   ```
6. Users can now sync from your Gist

### Option 2: GitHub Pages

1. Create GitHub repository
2. Add `submissions.json` file
3. Enable GitHub Pages
4. Update URL in `js/sharedArchive.js`:
   ```javascript
   const DEMO_ARCHIVE_URL = 'https://username.github.io/repo/submissions.json';
   ```

### Option 3: Any Static Host

Host `archive.json` on:
- Netlify
- Vercel
- Cloudflare Pages
- Any CDN

Update URL in code to point to your hosted file.

---

## Workflow Examples

### Solo Investigator

1. Solve cases
2. Submit investigations
3. Export archive as backup
4. Keep investigating

### Small Group (Friends)

1. Everyone investigates independently
2. Export archives weekly
3. Share JSON files via chat
4. Import each other's archives
5. Discuss theories together

### Large Community

1. Set up GitHub repository
2. Members submit via Pull Requests
3. Moderators review submissions
4. Merge approved investigations
5. Everyone syncs to get updates

---

## Troubleshooting

### Export Not Working?

- Check browser allows downloads
- Try different browser
- Check disk space

### Import Failed?

- Verify JSON file format
- Check file isn't corrupted
- Try re-exporting from source

### Sync Not Working?

- Check internet connection
- Verify Gist ID is correct
- Ensure Gist is public
- Try manual import instead

### Lost My Archive?

- Check browser localStorage
- Look for exported JSON backups
- Ask friends for their exports
- Re-investigate cases (they're deterministic!)

---

## Best Practices

### For Investigators

1. **Export regularly** - Backup your work
2. **Use descriptive names** - Help others find your work
3. **Write detailed notes** - Future you will thank you
4. **Share your archive** - Help the community

### For Community Managers

1. **Set up GitHub repo** - Central archive location
2. **Create submission guidelines** - Quality control
3. **Review submissions** - Prevent spam
4. **Update regularly** - Keep archive fresh

### For Privacy

1. **Don't use real name** - Use pseudonym if preferred
2. **Review before sharing** - Check what you're exporting
3. **Keep backups local** - Don't rely only on cloud
4. **Control your data** - You own your investigations

---

## Future Enhancements

### Planned Features

1. **Real-time Sync**
   - WebSocket connections
   - Live updates
   - Collaborative investigations

2. **Encryption**
   - Private archives
   - Password-protected exports
   - End-to-end encryption

3. **Social Features**
   - Follow investigators
   - Like/comment on submissions
   - Leaderboards

4. **Advanced Search**
   - Full-text search
   - Tag system
   - Related cases

---

## FAQ

**Q: Do I need an account?**
A: No! Everything works without any login.

**Q: Can others see my investigations?**
A: Only if you export and share them.

**Q: Is my data safe?**
A: Yes, it's stored locally in your browser.

**Q: Can I delete submissions?**
A: Yes, from your local archive anytime.

**Q: How do I contribute to shared archive?**
A: Export your archive and share the JSON file.

**Q: What if I switch browsers?**
A: Export from old browser, import to new one.

**Q: Can I edit submitted investigations?**
A: Not directly, but you can reopen and re-investigate.

**Q: Is there a limit to archive size?**
A: Browser localStorage typically allows 5-10MB.

---

## Summary

The Case011 archive system is:

✓ **Free** - No costs ever
✓ **Secure** - No servers, no logins
✓ **Private** - You control what's shared
✓ **Simple** - Export/import JSON files
✓ **Flexible** - Multiple sharing methods
✓ **Community-driven** - Share and learn together

**Start archiving your investigations today!**
