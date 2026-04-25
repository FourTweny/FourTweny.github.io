// =========================================================
// PEEKO PORTFOLIO — INTERACTIONS
// Filters, lightbox, keyboard nav, small flourishes
// =========================================================

(function () {
  'use strict';

  // Signal JS is active so CSS can enable staggered reveals safely
  document.documentElement.classList.add('js-ready');

  // ---------- Gallery filter ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery__item');
  const countEl = document.getElementById('count');

  function applyFilter(filter) {
    let visible = 0;
    galleryItems.forEach((item) => {
      const cat = item.getAttribute('data-cat');
      if (filter === 'all' || cat === filter) {
        item.classList.remove('is-hidden');
        visible++;
      } else {
        item.classList.add('is-hidden');
      }
    });
    if (countEl) countEl.textContent = visible;
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  // Handle hash navigation (e.g. work.html#campaigns)
  if (location.hash && document.getElementById('gallery')) {
    const targetCat = location.hash.substring(1);
    const match = Array.from(filterBtns).find(
      (b) => b.getAttribute('data-filter') === targetCat
    );
    if (match) {
      filterBtns.forEach((b) => b.classList.remove('filter-btn--active'));
      match.classList.add('filter-btn--active');
      applyFilter(targetCat);
    }
  }

  // ---------- Lightbox ----------
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('.lightbox__img');
    const lbClose = lightbox.querySelector('.lightbox__close');
    const lbPrev = lightbox.querySelector('.lightbox__prev');
    const lbNext = lightbox.querySelector('.lightbox__next');
    const lbCur = document.getElementById('lb-cur');
    const lbTotal = document.getElementById('lb-total');

    let currentIdx = 0;

    function getVisibleItems() {
      return Array.from(galleryItems).filter(
        (i) => !i.classList.contains('is-hidden')
      );
    }

    function openLightbox(idx) {
      const items = getVisibleItems();
      if (items.length === 0) return;
      currentIdx = idx;
      updateLightbox();
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function updateLightbox() {
      const items = getVisibleItems();
      if (currentIdx < 0) currentIdx = items.length - 1;
      if (currentIdx >= items.length) currentIdx = 0;
      const item = items[currentIdx];
      const img = item.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCur.textContent = currentIdx + 1;
      lbTotal.textContent = items.length;
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => {
        const visible = getVisibleItems();
        const visIdx = visible.indexOf(item);
        if (visIdx >= 0) openLightbox(visIdx);
      });
    });

    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIdx--;
      updateLightbox();
    });
    lbNext.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIdx++;
      updateLightbox();
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') { currentIdx--; updateLightbox(); }
      if (e.key === 'ArrowRight') { currentIdx++; updateLightbox(); }
    });
  }

  // ---------- Close mobile nav after link tap ----------
  document.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelector('.nav__links')?.classList.remove('is-open');
    });
  });

  // ---------- Staggered reveal via CSS class (no opacity:0 fallback risk) ----------
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -10% 0px' }
    );
    galleryItems.forEach((item, i) => {
      item.style.transitionDelay = `${Math.min(i * 0.04, 0.3)}s`;
      io.observe(item);
    });
  } else {
    galleryItems.forEach((i) => i.classList.add('is-visible'));
  }
})();
