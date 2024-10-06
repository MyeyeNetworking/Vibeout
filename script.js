document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainer = document.querySelector('.slideshow-container');
    const slides = document.querySelectorAll('.slideshow-slide');
    const prevButton = document.querySelector('.slideshow-prev');
    const nextButton = document.querySelector('.slideshow-next');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    let currentIndex = 0;

    // Background audio setup
    const backgroundAudio = new Audio('image/BG.music.mp3');
    backgroundAudio.loop = true; // Loop the background audio
    backgroundAudio.play(); // Play automatically

    // Video elements
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        video.addEventListener('play', () => {
            if (!video.muted) {
                backgroundAudio.pause(); // Pause background audio when video plays unmuted
            }
        });

        video.addEventListener('pause', () => {
            if (video.muted) {
                backgroundAudio.play(); // Resume background audio if video is muted
            }
        });

        video.addEventListener('ended', () => {
            backgroundAudio.play(); // Resume background audio when video ends
        });

        video.addEventListener('volumechange', () => {
            if (video.volume === 0) {
                backgroundAudio.play(); // Resume background audio when video is muted
            } else if (!video.muted && !video.paused) {
                backgroundAudio.pause(); // Pause background audio when video is playing unmuted
            }
        });
    });

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

    // Initialize the map in the "event-location" section
    if (document.getElementById('map')) {
        const map = L.map('map').setView([51.505, -0.09], 13); // Example coordinates

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([51.505, -0.09]).addTo(map)
            .bindPopup('Event Location')
            .openPopup();
    }
});

// Event form submission and storage in localStorage
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

    const currentDate = new Date(); // Get today's date

    // Filter out events that are happening today or in the past
    events.featured = events.featured.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate > currentDate; // Only keep upcoming events
    });

    // Update localStorage after filtering
    localStorage.setItem('events', JSON.stringify(events));

    // Display the remaining featured events
    events.featured.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'product-card';
        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date: ${new Date(event.date).toDateString()}</p>
            <p>Location: ${event.location}</p>
            <p>${event.description}</p>
        `;
        featuredContainer.appendChild(eventCard);
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', displayFeaturedEvents);

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

// JavaScript for page navigation with history state management
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










// Event form submission and storage in localStorage
document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const eventName = document.getElementById('event-name').value;
    const eventDate = new Date(document.getElementById('event-date').value);
    const eventLocation = document.getElementById('event-location').value;
    const eventDescription = document.getElementById('event-description').value;
    const eventCategory = document.getElementById('event-category').value; // Get selected category

    const currentDate = new Date();
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(currentDate.getDate() + 7);

    const eventData = {
        name: eventName,
        date: eventDate,
        location: eventLocation,
        description: eventDescription,
        category: eventCategory // Store category with event data
    };

    let events = JSON.parse(localStorage.getItem('events')) || { featured: [], upcoming: {} };

    // Populate based on event date
    if (eventDate <= sevenDaysLater) {
        if (!events.featured[eventCategory]) {
            events.featured[eventCategory] = [];
        }
        events.featured[eventCategory].push(eventData);
    } else {
        if (!events.upcoming[eventCategory]) {
            events.upcoming[eventCategory] = [];
        }
        events.upcoming[eventCategory].push(eventData);
    }

    localStorage.setItem('events', JSON.stringify(events));

    alert('Event submitted successfully!');
    // Optionally, you can clear the form fields here
    displayGenreEvents(eventCategory); // Display the events in the corresponding genre
});

// Function to display events in the corresponding genre
function displayGenreEvents(category) {
    const events = JSON.parse(localStorage.getItem('events')) || { featured: {} };
    const genreContainer = document.querySelector(`.${category}-events .product-grid`); // Select appropriate genre container
    genreContainer.innerHTML = ''; // Clear existing content

    // Filter and display featured events for the selected category
    const categoryEvents = events.featured[category] || [];
    const currentDate = new Date(); // Get today's date

    categoryEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'product-card';
        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date: ${new Date(event.date).toDateString()}</p>
            <p>Location: ${event.location}</p>
            <p>${event.description}</p>
        `;
        genreContainer.appendChild(eventCard);
    });
}

// Call this function when the page loads for each genre
document.addEventListener('DOMContentLoaded', () => {
    displayGenreEvents('Soca'); // Adjust as needed for each genre page
    displayGenreEvents('Dancehall'); // Adjust as needed for each genre page
    // Repeat for other genres...
});








// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true'; // returns true if logged in
}

// Function to redirect if not logged in
function checkLogin() {
    if (!isLoggedIn()) {
        window.location.href = '#login'; // Redirect to login page
    }
}

// Check login when the 'Promote Event' tab is clicked
document.querySelector('a[data-page="promote"]').addEventListener('click', function (e) {
    e.preventDefault();
    checkLogin(); // Check login before navigating
});

// Handle login submission (mock logic)
document.querySelector('#login-page form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Mock login - usually, you'll check the credentials via an API
    localStorage.setItem('isLoggedIn', 'true'); // Store login status
    alert('Login successful!');
    window.location.href = '#promote'; // Redirect to promote page
});

// Test: Check if user is redirected to login when clicking 'Promote Event' without being logged in
document.addEventListener('DOMContentLoaded', () => {
    const promoteLink = document.querySelector('a[data-page="promote"]');
    promoteLink.click(); // Simulate clicking 'Promote Event'
    console.assert(window.location.hash === '#login', 'User should be redirected to login page if not logged in');
});





