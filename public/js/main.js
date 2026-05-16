/* ============================================================
   DENI BAKERY — main.js
   Shared JavaScript: navbar, hamburger, scroll, reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAVBAR SCROLL SHADOW ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  /* ── HAMBURGER TOGGLE ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  function observeRevealElements() {
    document.querySelectorAll('.reveal').forEach(el => {
      if (!el.classList.contains('visible')) {
        revealObserver.observe(el);
      }
    });
  }
  observeRevealElements();

  // Expose for re-use in page-specific scripts (e.g., after dynamic render)
  window.observeRevealElements = observeRevealElements;

  /* ── TOAST UTILITY ── */
  window.showToast = function (message = '✅ Berhasil!', duration = 3500) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
  };

});
