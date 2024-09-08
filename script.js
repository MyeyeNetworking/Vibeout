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




const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const dropdownToggles = document.querySelectorAll('.nav-menu li > a');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent navigation
        const parentLi = toggle.parentElement;
        parentLi.classList.toggle('active');
    });
});

// Show the Genra section when the Genra link is clicked
genraLink.addEventListener('click', (e) => {
    e.preventDefault();

    // Hide all sections
    allSections.forEach(section => section.classList.add('hidden'));

    // Show Genra section
    genraSection.classList.remove('hidden');
});


