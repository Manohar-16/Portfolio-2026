/**
 * Portfolio - Main JavaScript
 * Manohar Rao | Web Developer
 * Handles: particles, typing effect, theme toggle, navbar scroll, Intersection Observer, modal, form, projects toggle
 */

(function () {
  'use strict';

  // --- Coding particles (wavy HTML/CSS snippets across entire page) ---
  (function initCodingParticles() {
    var container = document.getElementById('coding-particles');
    if (!container) return;
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    var snippets = [
      { text: '<html>', type: 'tag' },
      { text: '<div>', type: 'tag' },
      { text: '<p>', type: 'tag' },
      { text: '</section>', type: 'tag' },
      { text: '<span>', type: 'tag' },
      { text: '{ }', type: 'bracket' },
      { text: '.container', type: 'prop' },
      { text: '#header', type: 'prop' },
      { text: 'display: flex', type: 'prop' },
      { text: 'margin: 0', type: 'prop' },
      { text: 'function()', type: 'bracket' },
      { text: '=>', type: 'bracket' },
      { text: '</div>', type: 'tag' },
      { text: '<nav>', type: 'tag' },
      { text: 'padding: 1rem', type: 'prop' },
      { text: '@media', type: 'prop' },
      { text: 'const', type: 'bracket' },
      { text: 'return', type: 'bracket' },
      { text: '<footer>', type: 'tag' },
      { text: 'class=', type: 'tag' },
      { text: 'tailwind', type: 'prop' },
      { text: 'php', type: 'bracket' },
      { text: 'wp_', type: 'prop' },
    ];

    var count = 35;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < count; i++) {
      var idx = Math.floor(Math.random() * snippets.length);
      var s = snippets[idx];
      var span = document.createElement('span');
      span.className = 'code-particle code-particle--' + s.type;
      span.textContent = s.text;
      span.style.left = Math.random() * 100 + '%';
      span.style.top = Math.random() * 100 + '%';
      var duration = 8 + Math.random() * 6;
      var delay = Math.random() * 4;
      var anim = Math.random() > 0.5 ? 'codeFloat' : 'codeFloatAlt';
      span.style.animation = anim + ' ' + duration + 's ease-in-out ' + delay + 's infinite';
      frag.appendChild(span);
    }
    container.appendChild(frag);
  })();

  // --- Project data for modal ---
  const projects = {
    recall: {
      title: 'Recall Media FZ',
      desc: 'Corporate website with responsive layout, optimized performance, and clean UI.',
      tech: 'HTML, CSS, Bootstrap, JavaScript, PHP',
      url: 'https://recallmediafz.com/',
    },
    aftr: {
      title: 'AFTR',
      desc: 'Modern website with Tailwind-based responsive design and performance optimization.',
      tech: 'HTML, Tailwind CSS, JavaScript, PHP',
      url: 'https://aftr.ae/',
    },
    chipedge: {
      title: 'ChipEdge',
      desc: 'Business website with cross-browser compatibility and SEO-focused structure.',
      tech: 'HTML, CSS, Bootstrap, JavaScript, PHP',
      url: 'https://chipedge.com/',
    },
    kshemavana: {
      title: 'Kshemavana',
      desc: 'WordPress website using custom templates and SEO-friendly structure.',
      tech: 'WordPress, HTML, JavaScript, PHP',
      url: 'https://kshemavana.com/',
    },
    capstone: {
      title: 'Capstone Life',
      desc: 'Custom WordPress website with optimized performance and responsive design.',
      tech: 'WordPress (hard-coded templates), HTML, JavaScript, PHP',
      url: 'https://capstonelife.in/',
    },
    additional: {
      title: 'Additional Projects',
      desc: 'Various WordPress and custom HTML websites developed with a focus on responsiveness, SEO optimization, performance, and maintainability.',
      tech: 'WordPress, HTML, CSS, JavaScript, PHP',
      url: '',
    },
  };

  // --- Typing effect: human-like, consistent speed, cursor blinks only when paused ---
  const roles = [
    'Web Developer',
    'WordPress Specialist',
    'Landing Page Developer',
    'Frontend Developer',
  ];
  const TYPING_MS = 95;      // consistent delay per character (typing)
  const DELETING_MS = 55;    // consistent delay per character (deleting)
  const PAUSE_AT_END_MS = 2200;  // pause with blinking cursor before deleting
  const PAUSE_BETWEEN_ROLES_MS = 400;  // brief pause before next role

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;
  let typingTimer = null;

  const typingEl = document.getElementById('typing-role');
  const cursorEl = document.getElementById('typing-cursor');

  function setCursorBlinking(blink) {
    if (!cursorEl) return;
    if (blink) {
      cursorEl.classList.add('cursor-blink-on');
      cursorEl.classList.remove('cursor-solid');
    } else {
      cursorEl.classList.remove('cursor-blink-on');
      cursorEl.classList.add('cursor-solid');
    }
  }

  function scheduleNext(delay) {
    typingTimer = window.setTimeout(step, delay);
  }

  function step() {
    if (!typingEl) return;
    const current = roles[roleIndex];

    if (isPaused) {
      isPaused = false;
      setCursorBlinking(false);
      isDeleting = true;
      scheduleNext(DELETING_MS);
      return;
    }

    if (isDeleting) {
      if (charIndex <= 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setCursorBlinking(false);
        scheduleNext(PAUSE_BETWEEN_ROLES_MS);
        return;
      }
      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      scheduleNext(DELETING_MS);
      return;
    }

    if (charIndex >= current.length) {
      isPaused = true;
      setCursorBlinking(true);
      scheduleNext(PAUSE_AT_END_MS);
      return;
    }

    typingEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    scheduleNext(TYPING_MS);
  }

  if (typingEl) {
    setCursorBlinking(false);
    typingTimer = window.setTimeout(step, 800);
  }

  // --- Theme toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const html = document.documentElement;

  function getPreferredTheme() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  function toggleTheme() {
    setTheme(html.classList.contains('dark') ? 'light' : 'dark');
  }

  setTheme(getPreferredTheme());

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  // --- Navbar scroll ---
  const header = document.getElementById('navbar');
  const scrollThreshold = 60;

  function onScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.getElementById('nav-links');
        if (mobileMenu) mobileMenu.classList.add('hidden');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // --- Mobile menu ---
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden', isOpen);
      menuToggle.setAttribute('aria-expanded', !isOpen);
    });
  }

  // --- Intersection Observer: section titles and cards ---
  const observerOptions = { rootMargin: '0px 0px -80px 0px', threshold: 0.1 };

  const titleObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, observerOptions);

  document.querySelectorAll('.section-title').forEach(function (el) {
    titleObserver.observe(el);
  });

  const cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        const delay = entry.target.classList.contains('skill-card') ? i * 80 : i * 100;
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, delay);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.skill-card').forEach(function (el) {
    cardObserver.observe(el);
  });
  document.querySelectorAll('.project-card:not(.project-card--more)').forEach(function (el) {
    cardObserver.observe(el);
  });

  // --- Project modal ---
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');
  const modalLink = document.getElementById('modal-link');
  const modalClose = document.getElementById('modal-close');

  function openModal(key) {
    const data = projects[key];
    if (!data || !modal) return;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;
    modalTech.textContent = data.tech;
    if (data.url) {
      modalLink.href = data.url;
      modalLink.classList.remove('hidden');
    } else {
      modalLink.href = '#';
      modalLink.classList.add('hidden');
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target.closest('.project-link-no-url')) return;
      const key = card.getAttribute('data-project');
      if (key) openModal(key);
    });
  });

  // --- Projects: View More / View Less ---
  const projectsMoreWrapper = document.getElementById('projects-more-wrapper');
  const projectsToggleBtn = document.getElementById('projects-toggle-btn');
  if (projectsMoreWrapper && projectsToggleBtn) {
    projectsToggleBtn.addEventListener('click', function () {
      const isRevealed = projectsMoreWrapper.classList.contains('revealed');
      if (isRevealed) {
        projectsMoreWrapper.classList.remove('revealed');
        projectsMoreWrapper.setAttribute('aria-hidden', 'true');
        projectsToggleBtn.textContent = 'View More Projects';
        projectsToggleBtn.setAttribute('aria-expanded', 'false');
        projectsMoreWrapper.querySelectorAll('.project-card--more').forEach(function (card) {
          card.classList.remove('visible');
        });
      } else {
        projectsMoreWrapper.classList.add('revealed');
        projectsMoreWrapper.setAttribute('aria-hidden', 'false');
        projectsToggleBtn.textContent = 'View Less Projects';
        projectsToggleBtn.setAttribute('aria-expanded', 'true');
        var moreCards = projectsMoreWrapper.querySelectorAll('.project-card--more');
        moreCards.forEach(function (card, i) {
          setTimeout(function () {
            card.classList.add('visible');
          }, 80 * i);
        });
      }
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
  });

  // --- Contact form (UI only) ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sent!';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 2000);
    });
  }

  // --- Footer year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();


