/* ============================================================
   main.js — Core website functionality
   ============================================================ */

// ============================================================
// Navigation
// ============================================================
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  // Highlight active nav link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === page ||
      (page === '' && href === 'index.html') ||
      (href === 'blog.html' && page === 'blog-post.html')
    ) {
      link.classList.add('active');
    }
  });
}

// ============================================================
// Typing Animation
// ============================================================
function initTypingAnimation() {
  const el = document.querySelector('.typing-text');
  if (!el) return;

  const phrases = [
    'Cybersecurity Student',
    'Aspiring Security Analyst',
    'CTF Enthusiast',
    'Network Security Explorer',
    'Ethical Hacker in Training',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPaused    = false;

  function type() {
    const phrase = phrases[phraseIndex];

    if (isPaused) {
      isPaused = false;
      setTimeout(type, 1500);
      return;
    }

    if (isDeleting) {
      el.textContent = phrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
    } else {
      el.textContent = phrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === phrase.length) {
        isDeleting = true;
        isPaused   = true;
      }
    }

    setTimeout(type, isDeleting ? 55 : 85);
  }

  type();
}

// ============================================================
// Hero Terminal Animation
// ============================================================
function initHeroTerminal() {
  const body = document.querySelector('.terminal-body');
  if (!body) return;

  const lines = [
    { kind: 'cmd',     prompt: '~/security', text: 'nmap -sV -O 192.168.1.0/24' },
    { kind: 'output',  text: 'Starting Nmap 7.94 scan ...' },
    { kind: 'success', text: 'Host up: 192.168.1.1  Ports: 22,80,443' },
    { kind: 'cmd',     prompt: '~/security', text: 'python3 recon.py --target example.com' },
    { kind: 'output',  text: 'Enumerating subdomains...' },
    { kind: 'success', text: '[+] Found 14 subdomains' },
    { kind: 'cmd',     prompt: '~/security', text: 'sqlmap -u "http://target/login" --dbs' },
    { kind: 'output',  text: 'Testing payloads...' },
    { kind: 'success', text: '[+] Injectable parameter found: username' },
    { kind: 'cmd',     prompt: '~/security', text: 'cat flag.txt' },
    { kind: 'success', text: 'flag{k33p_l34rn1ng_cyb3rs3cur1ty}' },
  ];

  let i = 0;

  function addLine() {
    if (i >= lines.length) return;
    const line = lines[i];
    const el   = document.createElement('div');
    el.className = 'terminal-line';

    if (line.kind === 'cmd') {
      el.innerHTML = `<span class="terminal-prompt">${line.prompt} $</span><span class="terminal-cmd"> ${line.text}</span>`;
    } else {
      const cls = line.kind === 'success' ? 'terminal-output success' : 'terminal-output';
      el.innerHTML = `<span class="${cls}">${line.text}</span>`;
    }

    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    i++;

    if (i < lines.length) {
      setTimeout(addLine, line.kind === 'cmd' ? 900 : 420);
    }
  }

  setTimeout(addLine, 800);
}

// ============================================================
// Easter Egg Terminal
// ============================================================
function initEasterEgg() {
  const overlay  = document.querySelector('.easter-egg-overlay');
  const terminal = document.querySelector('.easter-egg-terminal');
  const input    = document.querySelector('.easter-egg-input');
  const output   = document.querySelector('.easter-egg-output');

  if (!overlay || !terminal || !output) return;

  let history = [];
  let hIdx    = -1;

  const COMMANDS = {
    help: () =>
      `Available commands:\n` +
      `  whoami    — About the owner\n` +
      `  skills    — List of tools & skills\n` +
      `  ls        — List site pages\n` +
      `  pwd       — Current directory\n` +
      `  uname     — System info\n` +
      `  date      — Current date\n` +
      `  cat flag  — Try your luck...\n` +
      `  clear     — Clear terminal\n` +
      `  exit      — Close this window`,

    whoami: () =>
      `mike@portfolio — Cybersecurity student, aspiring security analyst.\n` +
      `Passionate about ethical hacking, network security, and CTFs.`,

    skills: () =>
      `[+] Network:    Nmap, Wireshark, Tcpdump, Netcat\n` +
      `[+] Web:        Burp Suite, OWASP ZAP, SQLmap, Nikto\n` +
      `[+] Exploit:    Metasploit, Exploit-DB, CVE research\n` +
      `[+] OS:         Kali Linux, Parrot OS, Ubuntu, Windows\n` +
      `[+] Scripting:  Python, Bash\n` +
      `[+] Frameworks: MITRE ATT&CK, OWASP Top 10`,

    ls: () =>
      `index.html    about.html    blog.html\n` +
      `linkedin.html  resume.html   contact.html`,

    pwd:   () => `/home/mike/portfolio`,
    date:  () => new Date().toString(),
    uname: () => `KaliPortfolio 2026.1 LTS x86_64 GNU/Linux`,

    'cat flag': () =>
      `flag{y0u_f0und_th3_34st3r_3gg_gg_w3ll_d0n3}`,

    'echo hello': () => `hello`,
    whoami: () =>
      `mike — uid=1337(mike) gid=1337(security) groups=1337(security),0(root)`,
  };

  function open() {
    overlay.classList.add('open');
    terminal.classList.add('open');
    if (input) setTimeout(() => input.focus(), 50);
  }

  function close() {
    overlay.classList.remove('open');
    terminal.classList.remove('open');
  }

  function addLine(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    div.style.marginBottom = '0.1rem';
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  function addOutput(text, isError) {
    const color = isError ? '#ff5f56' : 'inherit';
    const escaped = text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    addLine(`<span style="color:${color};white-space:pre-wrap;">${escaped}</span>`);
  }

  function run(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    history.unshift(cmd);
    hIdx = -1;

    // echo cmd
    addLine(
      `<span style="color:#39ff14">mike@portfolio:~$</span> <span style="color:#e0e0e0">${raw.replace(/</g,'&lt;')}</span>`
    );

    if (cmd === 'clear') { output.innerHTML = ''; return; }
    if (cmd === 'exit')  { close(); return; }

    const handler = COMMANDS[cmd];
    if (handler) {
      addOutput(handler());
    } else {
      addOutput(`bash: ${cmd}: command not found\nType 'help' for available commands.`, true);
    }
  }

  // Keyboard shortcut: Ctrl + `
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === '`') {
      e.preventDefault();
      terminal.classList.contains('open') ? close() : open();
    }
    if (e.key === 'Escape' && terminal.classList.contains('open')) close();
  });

  overlay.addEventListener('click', close);

  document.querySelector('.easter-egg-close')?.addEventListener('click', close);

  document.querySelectorAll('.easter-egg-trigger').forEach(btn => {
    btn.addEventListener('click', open);
  });

  if (input) {
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const v = input.value;
        input.value = '';
        run(v);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (hIdx < history.length - 1) input.value = history[++hIdx];
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        hIdx > 0 ? (input.value = history[--hIdx]) : (hIdx = -1, input.value = '');
      }
    });
  }

  // Welcome banner
  addOutput(
    '  ██████╗██╗   ██╗██████╗ ███████╗██████╗ \n' +
    ' ██╔════╝╚██╗ ██╔╝██╔══██╗██╔════╝██╔══██╗\n' +
    ' ██║      ╚████╔╝ ██████╔╝█████╗  ██████╔╝\n' +
    ' ██║       ╚██╔╝  ██╔══██╗██╔══╝  ██╔══██╗\n' +
    ' ╚██████╗   ██║   ██████╔╝███████╗██║  ██║\n' +
    '  ╚═════╝   ╚═╝   ╚═════╝ ╚══════╝╚═╝  ╚═╝\n' +
    '\n' +
    ' Welcome to mike\'s portfolio terminal v1.0\n' +
    ' Type \'help\' to see available commands.\n' +
    ' Press Ctrl+` to toggle this terminal anytime.'
  );
}

// ============================================================
// Blog Listing
// ============================================================
function initBlog() {
  const grid      = document.querySelector('.blog-grid');
  const tagFilter = document.querySelector('.tag-filter');
  const noResults = document.querySelector('.no-results');

  if (!grid || typeof posts === 'undefined') return;

  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Collect all unique tags
  const allTags = new Set();
  sorted.forEach(p => p.tags.forEach(t => allTags.add(t)));

  // Render filter buttons
  if (tagFilter) {
    tagFilter.appendChild(makeTagBtn('all', true));
    [...allTags].sort().forEach(tag => tagFilter.appendChild(makeTagBtn(tag, false)));

    tagFilter.addEventListener('click', e => {
      if (!e.target.classList.contains('tag-btn')) return;
      tagFilter.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      filterPosts(e.target.dataset.tag, sorted, grid, noResults);
    });
  }

  renderPosts(sorted, grid);
}

function makeTagBtn(tag, active) {
  const btn = document.createElement('button');
  btn.className   = `tag-btn${active ? ' active' : ''}`;
  btn.dataset.tag = tag;
  btn.textContent = tag === 'all' ? '# all' : `# ${tag}`;
  return btn;
}

function filterPosts(tag, allPosts, grid, noResults) {
  const filtered = tag === 'all' ? allPosts : allPosts.filter(p => p.tags.includes(tag));
  renderPosts(filtered, grid);
  if (noResults) noResults.classList.toggle('hidden', filtered.length > 0);
}

function renderPosts(list, grid) {
  grid.innerHTML = '';
  list.forEach(post => grid.appendChild(makePostCard(post)));
}

function makePostCard(post) {
  const card = document.createElement('article');
  card.className = 'blog-card';

  const thumb = post.thumbnail
    ? (post.thumbnail.startsWith('http')
        ? `<img src="${post.thumbnail}" alt="${post.title}">`
        : `<span>${post.thumbnail}</span>`)
    : '<span>📝</span>';

  card.innerHTML = `
    <div class="blog-card-thumbnail">${thumb}</div>
    <div class="blog-card-body">
      <div class="blog-card-meta">
        <span class="blog-card-date">${formatDate(post.date)}</span>
        <div class="blog-card-tags">
          ${post.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
      <h2 class="blog-card-title">${post.title}</h2>
      <p class="blog-card-excerpt">${post.excerpt}</p>
      <a href="blog-post.html?id=${post.id}" class="blog-card-read">Read post →</a>
    </div>
  `;
  return card;
}

// ============================================================
// Blog Post Page
// ============================================================
function initBlogPost() {
  const container = document.querySelector('.post-container');
  if (!container || typeof posts === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const id     = parseInt(params.get('id'));
  const post   = posts.find(p => p.id === id);

  if (!post) {
    container.innerHTML = `
      <div class="no-results">
        <p style="font-size:2rem;margin-bottom:1rem">🔍</p>
        <p>Post not found.</p>
        <a href="blog.html" class="btn btn-outline mt-1">← Back to Blog</a>
      </div>`;
    return;
  }

  document.title = `${post.title} | Portfolio`;

  container.innerHTML = `
    <a href="blog.html" class="btn btn-outline btn-sm" style="margin-bottom:2rem;">← Back to Blog</a>
    <div class="post-header">
      <div class="post-meta">
        <span class="post-date">${formatDate(post.date)}</span>
        <div class="blog-card-tags">
          ${post.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
      <h1 class="post-title">${post.title}</h1>
      <p class="post-excerpt">${post.excerpt}</p>
    </div>
    <div class="post-content">
      ${post.content}
    </div>
  `;
}

// ============================================================
// LinkedIn Articles
// ============================================================
function initLinkedIn() {
  const grid = document.querySelector('.articles-grid');
  if (!grid || typeof linkedinArticles === 'undefined') return;

  const sorted = [...linkedinArticles].sort((a, b) => new Date(b.date) - new Date(a.date));

  sorted.forEach(article => {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.innerHTML = `
      <div class="article-source">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn Article
      </div>
      <h3 class="article-title">${article.title}</h3>
      <p class="article-preview">${article.preview}</p>
      <div class="article-meta">${formatDate(article.date)}${article.readTime ? ' · ' + article.readTime : ''}</div>
      <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
        Read on LinkedIn →
      </a>
    `;
    grid.appendChild(card);
  });
}

// ============================================================
// Scroll-in Animations
// ============================================================
function initScrollAnimations() {
  const els = document.querySelectorAll(
    '.card, .blog-card, .article-card, .cert-card, .skill-card, .contact-card, .edu-item, .stat-item'
  );

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });
}

// ============================================================
// Utility
// ============================================================
function formatDate(str) {
  return new Date(str + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

// ============================================================
// Init
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTypingAnimation();
  initHeroTerminal();
  initEasterEgg();
  initBlog();
  initBlogPost();
  initLinkedIn();
  setTimeout(initScrollAnimations, 150);
});
