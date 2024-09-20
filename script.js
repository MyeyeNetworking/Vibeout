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




// scripts.js

// Function to handle navigation
function showSection(sectionId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });
}

// Event listener for menu links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const page = event.target.getAttribute('data-page');
        showSection(page);
    });
});

// Event listener for genra images
document.querySelectorAll('#genra .genra-row a').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const sectionId = event.target.closest('a').getAttribute('href').substring(1);
        showSection(sectionId);
    });
});




document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;
    const eventLocation = document.getElementById('event-location').value;
    const eventCategory = document.getElementById('event-category').value;
    const eventFlyer = document.getElementById('event-flyer').files;
    const eventDescription = document.getElementById('event-description').value;

    // Process and send event data to your backend or database
    // Example: console.log the collected data
    console.log({
        eventName,
        eventDate,
        eventLocation,
        eventCategory,
        eventFlyer,
        eventDescription
    });

    // Add your logic to handle form submission to the backend or storage
});



// JavaScript for page navigation
const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('.page-section');

links.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetPage = this.getAttribute('data-page');

        // Change page sections
        sections.forEach(section => {
            if (section.id === targetPage) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        // Push the new state to the history
        window.history.pushState({ page: targetPage }, '', '#' + targetPage);
    });
});

// Listen for back button navigation
window.addEventListener('popstate', function(event) {
    const pageId = event.state?.page || 'home'; // Default to home page if no state
    sections.forEach(section => {
        if (section.id === pageId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
});




// Function to initialize an endless slider
function initSlider(slider) {
    const items = slider.querySelectorAll('.slider-item');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    let currentIndex = 0;
    let startX = 0;
    let endX = 0;
    let isMoving = false; // Prevent multiple clicks during animation

    // Function to show a specific item
    function showItem(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }

    // Button click events with infinite loop
    prevBtn.addEventListener('click', () => {
        if (isMoving) return; // Prevent multiple clicks
        isMoving = true;
        setTimeout(() => (isMoving = false), 300); // Add delay between clicks

        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        if (isMoving) return; // Prevent multiple clicks
        isMoving = true;
        setTimeout(() => (isMoving = false), 300); // Add delay between clicks

        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    });

    // Touch events for swipe detection with infinite loop
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    // Handle swipe gesture with infinite loop
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum swipe distance (in pixels) to trigger a slide change
        if (endX - startX > swipeThreshold) {
            // Swipe right (previous)
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showItem(currentIndex);
        } else if (startX - endX > swipeThreshold) {
            // Swipe left (next)
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        }
    }
}

// Apply the function to all sliders on the page
document.querySelectorAll('.slider').forEach(slider => {
    initSlider(slider);
});







// Initialize the map
var map = L.map('map', {
    touchZoom: false,    // Disable touch zoom by default
    scrollWheelZoom: false, // Disable scroll zoom
    doubleClickZoom: false, // Disable double-click zoom
});

// Set the map center and zoom level
map.setView([51.505, -0.09], 13); // Example coordinates (London)

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Enable two-finger zoom on touch devices
map.on('touchstart', function(e) {
    if (e.touches.length === 2) {
        map.touchZoom.enable();
    } else {
        map.touchZoom.disable();
    }
});
document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var location = document.getElementById('event-location').value;
    // Send location data to your backend via API or add it directly to your map
    addPinToMap(location);
});
function addPinToMap(location) {
    // Use a geocoding API to get latitude and longitude (example using OpenCage API)
    var apiKey = 'YOUR-API-KEY-HERE';
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            var lat = data.results[0].geometry.lat;
            var lng = data.results[0].geometry.lng;
            // Add a marker to the map
            L.marker([lat, lng]).addTo(map).bindPopup(location);
        })
        .catch(error => console.error('Error:', error));
}

let map;

function initMap() {
    // Initialize map centered on default location (e.g., New York City)
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.7128, lng: -74.0060 }, // Default location: New York City
        zoom: 8,
        gestureHandling: "greedy", // Enable two-finger scrolling
    });
}

// Function to add marker based on the submitted location
function addMarker(lat, lng, eventName) {
    const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: eventName,
    });
}

// Example usage: Function to handle form submission and populate the map
function handleFormSubmission() {
    const eventLocation = document.getElementById("event-location").value;
    const eventName = document.getElementById("event-name").value;

    // Geocode the eventLocation to get lat, lng
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: eventLocation }, (results, status) => {
        if (status === "OK") {
            const location = results[0].geometry.location;
            addMarker(location.lat(), location.lng(), eventName);
            map.setCenter(location); // Center map to new marker location
        } else {
            console.log("Geocode was not successful for the following reason: " + status);
        }
    });
}

// Example: Bind form submission to handleFormSubmission
document.getElementById("event-form").addEventListener("submit", function (e) {
    e.preventDefault();
    handleFormSubmission();
});


