document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slides = document.querySelectorAll('.slideshow-slide');
    const prevButton = document.querySelector('.slideshow-prev');
    const nextButton = document.querySelector('.slideshow-next');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
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

    // Toggle the mobile menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Navigate between pages and close the dropdown
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Hide all sections
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active');
            });

            // Show the clicked section
            const targetPage = this.getAttribute('data-page');
            document.getElementById(targetPage).classList.add('active');

            // Close the dropdown after a link is clicked
            navMenu.classList.remove('active');
        });
    });
});









document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const eventName = document.getElementById('event-name').value;
    const eventDate = new Date(document.getElementById('event-date').value);
    const eventLocation = document.getElementById('event-location').value;
    const eventDescription = document.getElementById('event-description').value;
    
    const currentDate = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(currentDate.getDate() + 7);
    
    const eventData = {
        name: eventName,
        date: eventDate,
        location: eventLocation,
        description: eventDescription
    };

    let events = JSON.parse(localStorage.getItem('events')) || { featured: [], upcoming: [] };

    if (eventDate <= sevenDaysLater) {
        events.featured.push(eventData);
    } else {
        events.upcoming.push(eventData);
    }

    localStorage.setItem('events', JSON.stringify(events));
    
    alert('Event submitted successfully!');
    // Optionally, you can clear the form fields here
});

function displayFeaturedEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || { featured: [] };

    const featuredContainer = document.querySelector('.events .product-grid');
    featuredContainer.innerHTML = ''; // Clear existing content

    events.featured.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'product-card';
        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date: ${event.date.toDateString()}</p>
            <p>Location: ${event.location}</p>
            <p>${event.description}</p>
        `;
        featuredContainer.appendChild(eventCard);
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', displayFeaturedEvents);
