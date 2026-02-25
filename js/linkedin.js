/**
 * ============================================================
 *  LINKEDIN ARTICLES DATA
 *  Add your LinkedIn article links here.
 * ============================================================
 *
 *  Required fields:
 *    id      - unique number
 *    title   - article title
 *    preview - 1-2 sentence description
 *    url     - full LinkedIn article URL
 *    date    - ISO date string "YYYY-MM-DD"
 *
 *  Optional:
 *    readTime - estimated read time (e.g. "5 min read")
 *
 *  HOW TO ADD AN ARTICLE:
 *    1. Paste your LinkedIn article URL
 *    2. Fill in the other fields
 *    3. Save — no other changes needed!
 *
 *  UPDATE THE URLS: Replace the placeholder URLs below
 *  with your actual LinkedIn article links.
 * ============================================================
 */

const linkedinArticles = [
  {
    id: 1,
    title: "Why Every CS Student Should Learn Cybersecurity Basics",
    preview: "Security isn't just for security professionals. I explore why understanding the basics of cybersecurity is becoming essential for every software engineer and computer science student.",
    url: "https://www.linkedin.com/pulse/YOUR-ARTICLE-URL-HERE",
    date: "2026-02-01",
    readTime: "4 min read"
  },
  {
    id: 2,
    title: "My Journey into Ethical Hacking: Starting from Zero",
    preview: "Six months ago I had never opened a terminal. Now I'm solving CTF challenges and studying for my Security+ certification. Here's what I learned along the way.",
    url: "https://www.linkedin.com/pulse/YOUR-ARTICLE-URL-HERE",
    date: "2026-01-15",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "Top 5 Free Resources for Cybersecurity Students in 2026",
    preview: "Learning cybersecurity doesn't have to cost a fortune. I've compiled the best free resources I've used on my journey — from TryHackMe to YouTube channels and books.",
    url: "https://www.linkedin.com/pulse/YOUR-ARTICLE-URL-HERE",
    date: "2025-12-20",
    readTime: "3 min read"
  }
];

// Do not modify below this line
if (typeof module !== 'undefined') module.exports = linkedinArticles;
