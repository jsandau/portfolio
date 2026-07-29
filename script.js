/* =============================================
   script.js — Portfolio interactions
   ============================================= */

(function () {
  'use strict';

  /* --------------------------------------------------
     1. NAV — active link highlighting on scroll
  -------------------------------------------------- */
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
     4. METRIC COUNT-UP — one-time, fires when a metric
        first enters the viewport. No opacity/position
        change on the element itself, only its digits.
  -------------------------------------------------- */
  const metricEls = document.querySelectorAll('[data-countup]');

  function animateMetric(el) {
    const target   = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix   = el.dataset.prefix || '';
    const suffix   = el.dataset.suffix || '';
    const duration = 900;
    const start    = performance.now();

    function frame(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  if (metricEls.length) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      metricEls.forEach(el => {
        const target   = parseFloat(el.dataset.target);
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        el.textContent = (el.dataset.prefix || '') + target.toFixed(decimals) + (el.dataset.suffix || '');
      });
    } else {
      const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateMetric(entry.target);
            metricObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });

      metricEls.forEach(el => metricObserver.observe(el));
    }
  }

})();
