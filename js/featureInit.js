// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Theme Switcher
    const themeSwitcher = getThemeSwitcher();
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            themeSwitcher.switchTheme(theme);
        });
    });

    // Initialize Notebook Templates
    const templates = {
        timeline: `TIMELINE OF EVENTS
==================

[Date/Time] - Event description
[Date/Time] - Event description
[Date/Time] - Event description

Key observations:
- 
- 
`,
        suspects: `SUSPECTS / PERSONS OF INTEREST
==============================

Name: 
Background: 
Motive: 
Opportunity: 
Evidence: 

Name: 
Background: 
Motive: 
Opportunity: 
Evidence: 
`,
        evidence: `EVIDENCE CATALOG
================

ARTIFACT 01:
Description: 
Significance: 
Source: 

ARTIFACT 02:
Description: 
Significance: 
Source: 
`,
        theories: `INVESTIGATION THEORIES
======================

THEORY A:
Hypothesis: 
Supporting Evidence: 
- 
- 
Contradictions: 
- 

THEORY B:
Hypothesis: 
Supporting Evidence: 
- 
- 
Contradictions: 
- 
`
    };

    document.querySelectorAll('.template-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const templateType = btn.dataset.template;
            const notebookArea = document.getElementById('notebookArea');
            if (notebookArea && templates[templateType]) {
                const currentContent = notebookArea.value;
                const separator = currentContent ? '\n\n---\n\n' : '';
                notebookArea.value = currentContent + separator + templates[templateType];
                notebookArea.dispatchEvent(new Event('input'));
                notebookArea.focus();
            }
        });
    });
});
