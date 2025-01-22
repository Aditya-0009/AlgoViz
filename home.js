document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll effect for "Start Visualizing" button
    const btn = document.querySelector('.btn');
    if (btn) {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSection = document.querySelector('#start-visualizing');
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add a "scroll to top" button that appears when the user scrolls down
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        });
    }
});
