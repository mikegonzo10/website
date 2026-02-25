/**
 * ============================================================
 *  BLOG POSTS DATA
 *  Add new posts by adding objects to this array.
 *  Posts are sorted by date (newest first) automatically.
 * ============================================================
 *
 *  Required fields:
 *    id       - unique number (increment from last)
 *    title    - post title
 *    date     - ISO date string: "YYYY-MM-DD"
 *    tags     - array of lowercase strings
 *    excerpt  - short summary (shown on blog listing)
 *    content  - full post content (HTML supported)
 *
 *  Optional fields:
 *    thumbnail - emoji (e.g. "🔒") or image URL
 *
 *  HOW TO ADD A NEW POST:
 *    1. Copy an existing post object and paste it at the TOP of the array
 *    2. Give it the next unique id number
 *    3. Fill in all required fields
 *    4. Save — no other changes needed!
 * ============================================================
 */

const posts = [
  {
    id: 1,
    title: "Getting Started with Nmap: A Practical Guide",
    date: "2026-02-20",
    tags: ["nmap", "recon", "tools", "beginner"],
    thumbnail: "🔍",
    excerpt: "Nmap is the go-to tool for network discovery and security auditing. I break down the most useful commands and explain when to use each one.",
    content: `
<h2>What is Nmap?</h2>
<p>Nmap (Network Mapper) is a free, open-source utility used for network discovery and security auditing. It can detect what hosts are on a network, what services they're running, what OS they're using, and much more.</p>

<h2>Basic Scanning Commands</h2>
<p>Here are the most common Nmap commands you'll use regularly:</p>

<pre><code># Simple host scan
nmap 192.168.1.1

# Scan a subnet
nmap 192.168.1.0/24

# Service version detection
nmap -sV 192.168.1.1

# OS detection
nmap -O 192.168.1.1

# Full scan with scripts
nmap -A 192.168.1.1</code></pre>

<h2>Scan Types</h2>
<p>Nmap offers several scan types, each with different use cases:</p>
<ul>
  <li><strong>TCP SYN Scan (-sS)</strong> — The default "stealth" scan. Fast and relatively undetected.</li>
  <li><strong>TCP Connect Scan (-sT)</strong> — Full TCP connection. Useful when you don't have raw socket privileges.</li>
  <li><strong>UDP Scan (-sU)</strong> — Slower but important for finding UDP services like DNS, SNMP.</li>
  <li><strong>Null/FIN/Xmas Scans</strong> — Used to bypass certain firewalls.</li>
</ul>

<h2>Useful NSE Scripts</h2>
<p>Nmap comes with the NSE (Nmap Scripting Engine) with hundreds of scripts:</p>

<pre><code># Check for common vulnerabilities
nmap --script vuln 192.168.1.1

# Enumerate HTTP information
nmap --script http-enum 192.168.1.1

# SMB enumeration
nmap --script smb-enum-shares 192.168.1.1</code></pre>

<h2>My CTF Starting Command</h2>
<p>When working on CTF challenges, I always start with a comprehensive scan to map the attack surface:</p>

<pre><code>nmap -sC -sV -oN initial_scan.txt target_ip</code></pre>

<p>The <code>-oN</code> flag saves output to a file — crucial for keeping notes during a challenge.</p>

<h2>Conclusion</h2>
<p>Nmap is an essential tool in any security professional's toolkit. Practice on platforms like TryHackMe and HackTheBox, and always ensure you have permission before scanning any network.</p>
`
  },
  {
    id: 2,
    title: "Understanding the OSI Model Through a Security Lens",
    date: "2026-02-10",
    tags: ["networking", "fundamentals", "theory"],
    thumbnail: "🌐",
    excerpt: "The OSI model isn't just for network engineers. Understanding each layer helps security analysts identify where attacks happen and how to defend against them.",
    content: `
<h2>Why the OSI Model Matters in Security</h2>
<p>When I first learned about the OSI model, it felt abstract and academic. But once I started studying security, I realized it's the fundamental framework that explains almost every network attack.</p>

<h2>The 7 Layers and Their Security Implications</h2>

<h3>Layer 7 — Application</h3>
<p>This is where most web vulnerabilities live. SQL injection, XSS, CSRF — all happen here. Tools like Burp Suite operate at this layer.</p>

<h3>Layer 4 — Transport</h3>
<p>TCP and UDP live here. SYN flood attacks target this layer by exhausting connection queues. Port scanning also operates here.</p>

<h3>Layer 3 — Network</h3>
<p>IP addressing and routing. ARP poisoning and IP spoofing attacks operate at this level.</p>

<h3>Layer 2 — Data Link</h3>
<p>MAC addresses and switching. ARP spoofing and MAC flooding target switches at this layer.</p>

<h2>Mapping Attacks to Layers</h2>
<p>Understanding which layer an attack targets helps you choose the right defense:</p>
<ul>
  <li><strong>DDoS</strong> — Layers 3, 4, and 7</li>
  <li><strong>Man-in-the-Middle</strong> — Layers 2, 3, and 7</li>
  <li><strong>SQL Injection</strong> — Layer 7</li>
  <li><strong>Port Scanning</strong> — Layers 3 and 4</li>
</ul>

<h2>Practical Takeaway</h2>
<p>Next time you see a CVE or vulnerability disclosure, try to identify which OSI layer it affects. This mental model helps you think like both an attacker and a defender.</p>
`
  },
  {
    id: 3,
    title: "My First CTF Writeup: Web Category Challenge",
    date: "2026-01-28",
    tags: ["ctf", "web", "writeup", "beginner"],
    thumbnail: "🚩",
    excerpt: "I competed in my first CTF and solved a web challenge using SQL injection. Here's my thought process, methodology, and what I learned.",
    content: `
<h2>Background</h2>
<p>This was my first capture-the-flag competition. I entered with a beginner team and focused on the web category since that's where my knowledge was strongest going in.</p>

<h2>The Challenge</h2>
<p>The challenge presented a login form with username and password fields. The goal was to bypass authentication and retrieve the flag.</p>

<h2>Initial Reconnaissance</h2>
<p>My first step was to understand the application's behavior:</p>
<ul>
  <li>Tried common credentials (admin/admin, admin/password)</li>
  <li>Looked at form behavior with special characters</li>
  <li>Checked for verbose error messages</li>
</ul>

<h2>Finding the Vulnerability</h2>
<p>When I entered a single quote <code>'</code> in the username field, the server returned a database error — a classic indicator of SQL injection:</p>

<pre><code>Error: You have an error in your SQL syntax near ''' at line 1</code></pre>

<h2>Exploitation</h2>
<p>With confirmation of SQL injection, I tried a basic authentication bypass:</p>

<pre><code>Username: admin'--
Password: anything</code></pre>

<p>The <code>--</code> comments out the rest of the SQL query, bypassing the password check entirely.</p>

<h2>Flag Retrieved</h2>
<p>After logging in, the flag was displayed on the dashboard. The experience showed me how simple developer mistakes lead to complete authentication bypass.</p>

<h2>Key Takeaways</h2>
<ul>
  <li>Always test with special characters first</li>
  <li>Error messages reveal valuable information</li>
  <li>Parameterized queries would have prevented this entirely</li>
  <li>CTFs are a great way to practice legally and safely</li>
</ul>
`
  }
];

// Do not modify below this line
if (typeof module !== 'undefined') module.exports = posts;
