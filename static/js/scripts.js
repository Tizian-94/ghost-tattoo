document.addEventListener('DOMContentLoaded', () => {
  // ==================== LIGHTBOX SETUP ====================
  const overlay = document.getElementById('lightboxOverlay');
  const closeBtn = document.querySelector('.lightbox-close');
  const images = document.querySelectorAll('.custom-ratio img');
  const lightbox = document.getElementById('lightboxImage');

  if (overlay && closeBtn && lightbox && images.length) {
    function closeLightbox() {
      overlay.style.display = 'none';
      document.body.style.overflow = 'auto';
    }

    images.forEach(img => {
      img.addEventListener('click', () => {
        lightbox.src = img.src;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  }
});