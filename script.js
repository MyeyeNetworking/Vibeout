let carouselIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const slideInterval = 5000; // Time in milliseconds (5 seconds)

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });
}

nextButton.addEventListener('click', () => {
    carouselIndex = (carouselIndex + 1) % slides.length;
    showSlide(carouselIndex);
});

prevButton.addEventListener('click', () => {
    carouselIndex = (carouselIndex - 1 + slides.length) % slides.length;
    showSlide(carouselIndex);
});

// Event listeners for manual navigation
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Auto slide functionality
setInterval(nextSlide, slideInterval);

// Initialize first slide
showSlide(currentSlide);
