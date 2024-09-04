let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const nextButton = document.querySelector('.carousel-next');
const prevButton = document.querySelector('.carousel-prev');
const slideInterval = 5000; // Time in milliseconds (5 seconds)

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

// Move to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Move to the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Auto slide functionality
setInterval(nextSlide, slideInterval);

// Initialize first slide
showSlide(currentSlide);

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Auto slide functionality
setInterval(nextSlide, slideInterval);

// Initialize first slide
showSlide(currentSlide);
