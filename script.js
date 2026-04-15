/* =============================================
   script.js — Portfolio interactions
   ============================================= */

(function () {
  'use strict';

  /* --------------------------------------------------
     1. NAV — active link highlighting on scroll
  -------------------------------------------------- */
  const nav       = document.getElementById('nav');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const sections  = document.querySelectorAll('section[id]');
  const toggle    = document.querySelector('.nav-toggle');
  const linksList = document.querySelector('.nav-links');

  function updateActiveNav() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();


  /* --------------------------------------------------
     2. MOBILE MENU toggle
  -------------------------------------------------- */
  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    linksList.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      linksList.classList.remove('open');
    });
  });


  /* --------------------------------------------------
     3. SMOOTH SCROLL (for hash links)
  -------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 56; // nav height
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });


  /* --------------------------------------------------
     4. SCROLL REVEAL — minimal reveal on intersection
  -------------------------------------------------- */
  const revealElements = [
    '.section-label',
    '.about-grid',
    '.project',
    '.contact-grid',
    'footer',
  ];

  // Mark elements for reveal
  revealElements.forEach(selector => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add('reveal');
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

})();
