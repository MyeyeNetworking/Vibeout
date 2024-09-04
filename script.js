let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const nextButton = document.querySelector('.carousel-next');
const prevButton = document.querySelector('.carousel-prev');
const slideInterval = 5000; // Time in milliseconds (5 seconds)

let carouselIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');

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

// Initialize the first slide
showSlide(carouselIndex);


// Auto slide functionality
setInterval(nextSlide, slideInterval);


