document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slides = document.querySelectorAll('.slideshow-slide');
    const prevButton = document.querySelector('.slideshow-prev');
    const nextButton = document.querySelector('.slideshow-next');
    
    let currentIndex = 0;

    function updateSlideshow() {
        const offset = -currentIndex * 100;
        slideshowContainer.style.transform = `translateX(${offset}%)`;
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlideshow();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlideshow();
    }

    prevButton.addEventListener('click', showPrevSlide);
    nextButton.addEventListener('click', showNextSlide);

    // Optional: Auto-slide functionality
    setInterval(showNextSlide, 3000); // Change slide every 3 seconds
});



// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
