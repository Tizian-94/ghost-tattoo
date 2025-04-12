document.addEventListener('DOMContentLoaded', function() {
    // Lightbox functionality
    const images = document.querySelectorAll('.custom-ratio img');
    const overlay = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImage');
    const closeBtn = document.querySelector('.lightbox-close');

    function closeLightbox() {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    images.forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            overlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function(e) {
        if(e.target === overlay) closeLightbox();
    });

    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape') closeLightbox();
    });
});