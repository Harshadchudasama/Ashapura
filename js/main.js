/**
 * SHREE ASHAPURA FIBER AND INTERIOR FURNITURE - Core JavaScript
 * Dynamic filtering, Lightbox, Search modal, and Mobile navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-active');
      const isExpanded = mainNav.classList.contains('mobile-active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target) && mainNav.classList.contains('mobile-active')) {
        mainNav.classList.remove('mobile-active');
      }
    });
  }

  // Interactive Card Filtering (for Kitchen, Ceiling, TV Units)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const designCards = document.querySelectorAll('.design-card');

  if (filterButtons.length > 0 && designCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        designCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          const categories = category.toLowerCase().split(' ');

          if (filterValue === 'all' || categories.includes(filterValue.toLowerCase())) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox Modal for Design Cards
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxWaBtn = document.getElementById('lightboxWaBtn');

  if (lightboxModal && lightboxImg) {
    designCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.card-img');
        const title = card.querySelector('.card-title');
        const subtitle = card.querySelector('.card-subtitle');

        if (img && title) {
          lightboxImg.src = img.src;
          lightboxTitle.textContent = title.textContent;
          lightboxCategory.textContent = subtitle ? subtitle.textContent : '';
          
          if (lightboxWaBtn) {
            const message = encodeURIComponent(`Hello Shree Ashapura, I am interested in: ${title.textContent} (${subtitle ? subtitle.textContent : ''})`);
            lightboxWaBtn.href = `https://wa.me/919228750691?text=${message}`;
          }

          lightboxModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // Quick Search Modal
  const searchToggleBtn = document.querySelector('.search-toggle-btn');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  if (searchToggleBtn && searchModal) {
    searchToggleBtn.addEventListener('click', () => {
      searchModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 100);
    });

    const closeSearch = () => {
      searchModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    if (searchClose) searchClose.addEventListener('click', closeSearch);

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeSearch();
      }
    });

    // Quick chip selection in search
    const searchChips = document.querySelectorAll('.search-chip');
    searchChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-search');
        if (query === 'kitchen') window.location.href = 'pvc-kitchen.html';
        else if (query === 'ceiling') window.location.href = 'pvc-ceiling.html';
        else if (query === 'tv') window.location.href = 'tv-units.html';
        else if (query === 'catalogues') window.location.href = 'catalogues.html';
        else if (query === 'contact') window.location.href = 'contact.html';
      });
    });

    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const val = searchInput.value.toLowerCase().trim();
          if (val.includes('kitchen')) window.location.href = 'pvc-kitchen.html';
          else if (val.includes('ceiling')) window.location.href = 'pvc-ceiling.html';
          else if (val.includes('tv') || val.includes('unit')) window.location.href = 'tv-units.html';
          else if (val.includes('catalogue') || val.includes('pdf')) window.location.href = 'catalogues.html';
          else if (val.includes('contact') || val.includes('phone') || val.includes('address')) window.location.href = 'contact.html';
          else window.location.href = 'pvc-kitchen.html';
        }
      });
    }
  }

  // Contact Form Submission Handler
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('custName')?.value || '';
      const phone = document.getElementById('custPhone')?.value || '';
      const subject = document.getElementById('custSubject')?.value || 'Inquiry';
      const message = document.getElementById('custMessage')?.value || '';

      const waText = encodeURIComponent(
        `Hello Shree Ashapura,\n\nName: ${name}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`
      );

      showToast(`Thank you ${name}! Opening WhatsApp to send your enquiry...`);
      
      setTimeout(() => {
        window.open(`https://wa.me/919228750691?text=${waText}`, '_blank');
        enquiryForm.reset();
      }, 1200);
    });
  }

  // Catalogue Download Buttons Feedback
  const downloadButtons = document.querySelectorAll('.btn-download-cat, .btn-mini-pdf');
  downloadButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const catName = btn.getAttribute('data-cat') || 'Catalogue';
      showToast(`Preparing download for: ${catName}...`);
      setTimeout(() => {
        showToast(`Download started for ${catName} (PDF)`);
      }, 1000);
    });
  });
});

// Toast notification helper
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4d4f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
