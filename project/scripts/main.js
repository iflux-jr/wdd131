// Main JavaScript for PNW Hiking Collective Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize components based on current page
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    // Common initialization
    initializeNavigation();
    initializeCurrentYear();
    
    // Page-specific initialization
    if (page === 'index.html' || page === '') {
        initializeHomePage();
    } else if (page === 'trails.html') {
        initializeTrailsPage();
    } else if (page === 'gallery.html') {
        initializeGalleryPage();
    } else if (page === 'contact.html') {
        initializeContactPage();
    }
}

// Common Functions
function initializeNavigation() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage === linkHref) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initializeCurrentYear() {
    // Set current year in footer if element exists
    const yearElement = document.querySelector('#current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Home Page Functions
function initializeHomePage() {
    // Load events
    loadEvents();
    
    // Add event button functionality
    const addEventBtn = document.getElementById('add-event-btn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', addSampleEvent);
    }
}

// Hamburger Menu Functionality
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
    
    // Create close button for mobile
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-menu';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.setAttribute('aria-label', 'Close menu');
    navMenu.appendChild(closeBtn);
    
    // Toggle menu function
    function toggleMenu() {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        hamburger.style.display = navMenu.classList.contains('active') ? 'none' : 'block';
    }
    
    // Event Listeners
    hamburger.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu when clicking on a link (for single page navigation)
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleMenu();
            }
        });
    });
    
    // Close menu on window resize (if resizing to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.style.display = 'none';
        } else {
            hamburger.style.display = 'block';
        }
    });
    
    // Handle Escape key to close menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// Update initializeNavigation function
function initializeNavigation() {
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPage === linkHref) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Initialize mobile menu
    initializeMobileMenu();
}

function loadEvents() {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;
    
    // Check localStorage for custom events
    let events = JSON.parse(localStorage.getItem('hikingEvents')) || [
        {
            id: 1,
            title: 'Beginner Hike: Discovery Park',
            date: 'April 15, 2024',
            description: 'Easy 3-mile loop, perfect for beginners'
        },
        {
            id: 2,
            title: 'Mount Si Challenge Hike',
            date: 'April 22, 2024',
            description: 'Advanced hike with 3,150 ft elevation gain'
        },
        {
            id: 3,
            title: 'Family Hike: Rattlesnake Ledge',
            date: 'April 29, 2024',
            description: 'Moderate hike suitable for families with kids'
        }
    ];
    
    // Save to localStorage if we're using default events
    if (!localStorage.getItem('hikingEvents')) {
        localStorage.setItem('hikingEvents', JSON.stringify(events));
    }
    
    // Clear container
    eventsContainer.innerHTML = '';
    
    // Create event cards
    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventsContainer.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const div = document.createElement('div');
    div.className = 'event-card';
    div.innerHTML = `
        <div class="event-info">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
        </div>
        <div class="event-date">${event.date}</div>
    `;
    return div;
}

function addSampleEvent() {
    const events = JSON.parse(localStorage.getItem('hikingEvents')) || [];
    
    const newEvent = {
        id: events.length + 1,
        title: 'Weekend Adventure: Your Choice!',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        description: 'Add your own adventure idea!'
    };
    
    events.push(newEvent);
    localStorage.setItem('hikingEvents', JSON.stringify(events));
    
    // Reload events
    loadEvents();
    
    // Show confirmation
    alert('New event added! Check out the events list.');
}

// Trails Page Functions
function initializeTrailsPage() {
    // Load trails
    loadTrails();
    
    // Initialize favorites
    loadFavorites();
    
    // Clear favorites button
    const clearBtn = document.getElementById('clear-favorites');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllFavorites);
    }
}

function loadTrails() {
    const trailsContainer = document.getElementById('trails-container');
    if (!trailsContainer) return;
    
    // Sample trail data
    const trails = [
        {
            id: 1,
            name: 'Mount Rainier - Skyline Trail',
            difficulty: 'Moderate',
            length: '5.5 miles',
            elevation: '1,450 ft',
            description: 'Stunning views of Mount Rainier and wildflower meadows',
            image: 'https://plus.unsplash.com/premium_photo-1661899345602-a444aea6a458?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            isFavorite: false
        },
        {
            id: 2,
            name: 'Olympic National Park - Hoh River Trail',
            difficulty: 'Easy',
            length: '10.6 miles',
            elevation: '400 ft',
            description: 'Walk through lush rainforest along the Hoh River',
            image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            isFavorite: false
        },
        {
            id: 3,
            name: 'North Cascades - Cascade Pass',
            difficulty: 'Hard',
            length: '7.4 miles',
            elevation: '1,800 ft',
            description: 'Spectacular mountain views and glacier sightings',
            Image: '',
            isFavorite: false
        },
        {
            id: 4,
            name: 'Mount St. Helens - Harrys Ridge',
            difficulty: 'Moderate',
            length: '8.2 miles',
            elevation: '1,200 ft',
            description: 'Incredible views of the crater and Spirit Lake',
            image: 'https://plus.unsplash.com/premium_photo-1661810803959-f91f5195138e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            isFavorite: false
        },
        {
            id: 5,
            name: 'Tiger Mountain - West Tiger #3',
            difficulty: 'Easy',
            length: '4.0 miles',
            elevation: '1,000 ft',
            description: 'Popular trail with panoramic views of the Seattle skyline',
            image: 'https://plus.unsplash.com/premium_photo-1755018427552-c333ea1dc879?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            isFavorite: false
        },
        {
            id: 6,
            name: 'Mount Baker - Artist Point',
            difficulty: 'Hard',
            length: '6.5 miles',
            elevation: '2,200 ft',
            description: 'Breathtaking views of Mount Baker and surrounding peaks',
            image: 'https://plus.unsplash.com/premium_photo-1661842867772-6b29f45eb280?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            isFavorite: false
        }
    ];
    
    // Clear container
    trailsContainer.innerHTML = '';
    
    // Get favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('trailFavorites')) || [];
    
    // Create trail cards
    trails.forEach(trail => {
        trail.isFavorite = favorites.includes(trail.id);
        const trailCard = createTrailCard(trail);
        trailsContainer.appendChild(trailCard);
    });
}

function createTrailCard(trail) {
    const div = document.createElement('div');
    div.className = 'trail-card';
    
    // Use image if available, otherwise use icon
    const imageContent = trail.image 
        ? `<img src="${trail.image}" alt="${trail.name}" loading="lazy" class="trail-photo">`
        : `<i class="fas fa-mountain"></i>`;
    
    div.innerHTML = `
        <div class="trail-image">
            ${imageContent}
        </div>
        <div class="trail-content">
            <h3>${trail.name}</h3>
            <p>${trail.description}</p>
            <div class="trail-details">
                <span><i class="fas fa-chart-line"></i> ${trail.difficulty}</span>
                <span><i class="fas fa-road"></i> ${trail.length}</span>
                <span><i class="fas fa-mountain"></i> ${trail.elevation}</span>
            </div>
            <button class="favorite-btn ${trail.isFavorite ? 'active' : ''}" 
                    data-trail-id="${trail.id}">
                <i class="fas fa-heart"></i>
                ${trail.isFavorite ? ' Favorited' : ' Add to Favorites'}
            </button>
        </div>
    `;
    
    // Add click event to favorite button
    const favBtn = div.querySelector('.favorite-btn');
    favBtn.addEventListener('click', function() {
        toggleFavorite(trail.id, this);
    });
    
    return div;
}

function toggleFavorite(trailId, button) {
    let favorites = JSON.parse(localStorage.getItem('trailFavorites')) || [];
    
    if (favorites.includes(trailId)) {
        // Remove from favorites
        favorites = favorites.filter(id => id !== trailId);
        button.classList.remove('active');
        button.innerHTML = '<i class="fas fa-heart"></i> Add to Favorites';
    } else {
        // Add to favorites
        favorites.push(trailId);
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-heart"></i> Favorited';
    }
    
    localStorage.setItem('trailFavorites', JSON.stringify(favorites));
    loadFavorites();
}

function loadFavorites() {
    const container = document.getElementById('favorites-container');
    if (!container) return;
    
    const favorites = JSON.parse(localStorage.getItem('trailFavorites')) || [];
    
    // Clear container
    container.innerHTML = '';
    
    if (favorites.length === 0) {
        container.innerHTML = '<p>No favorite trails yet. Click the heart button on any trail to add it!</p>';
        return;
    }
    
    // Sample trail names for display (in a real app, you'd fetch these)
    const trailNames = {
        1: 'Mount Rainier',
        2: 'Hoh River Trail',
        3: 'Cascade Pass',
        4: 'Harrys Ridge',
        5: 'West Tiger #3',
        6: 'Artist Point'
    };
    
    favorites.forEach(trailId => {
        const div = document.createElement('div');
        div.className = 'favorite-item';
        div.innerHTML = `
            <i class="fas fa-heart" style="color: var(--secondary-color)"></i>
            ${trailNames[trailId] || `Trail #${trailId}`}
        `;
        container.appendChild(div);
    });
}

function clearAllFavorites() {
    if (confirm('Are you sure you want to clear all favorite trails?')) {
        localStorage.removeItem('trailFavorites');
        loadTrails(); // Reload to update button states
        loadFavorites();
    }
}

// Gallery Page Functions
function initializeGalleryPage() {
    // Load gallery
    loadGallery();
    
    // View toggle button
    const viewToggle = document.getElementById('view-toggle');
    if (viewToggle) {
        viewToggle.addEventListener('click', toggleGalleryView);
    }
}

function loadGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;
    
    // Updated gallery data with actual Unsplash URLs
    const galleryItems = [
        { 
            id: 1, 
            title: 'Mountain Sunrise', 
            image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Beautiful sunrise over Mount Rainier'
        },
        { 
            id: 2, 
            title: 'Forest Path', 
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Peaceful trail through old-growth forest'
        },
        { 
            id: 3, 
            title: 'Waterfall Adventure', 
            image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Hiking to a hidden waterfall in the Cascades'
        },
        { 
            id: 4, 
            title: 'Wildflower Meadow', 
            image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Colorful wildflowers in alpine meadow'
        },
        { 
            id: 5, 
            title: 'Summit View', 
            image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Panoramic view from mountain summit'
        },
        { 
            id: 6, 
            title: 'Lake Reflection', 
            image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Perfect reflection in alpine lake'
        },
        { 
            id: 7, 
            title: 'Trail Marker', 
            image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Following the trail through the woods'
        },
        { 
            id: 8, 
            title: 'Camp Site', 
            image: 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
            description: 'Cozy campsite at the end of the day'
        }
    ];
    
    // Clear container
    container.innerHTML = '';
    
    // Create gallery items
    galleryItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <img src="${item.image}" 
                 alt="${item.title}" 
                 loading="lazy"
                 class="gallery-image">
            <div class="gallery-overlay">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `;
        
        // Add click event
        div.addEventListener('click', function() {
            viewPhoto(item);
        });
        
        container.appendChild(div);
    });
    
    // Load stats
    updateGalleryStats(galleryItems.length);
}

function viewPhoto(item) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${item.image}" alt="${item.title}" class="modal-image">
            <div class="modal-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="modal-actions">
                    <button class="btn secondary like-btn">
                        <i class="fas fa-heart"></i> Like
                    </button>
                    <button class="btn secondary download-btn">
                        <i class="fas fa-download"></i> Download
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Click outside to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Add modal styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .photo-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
        }
        
        .modal-content {
            background: white;
            border-radius: var(--border-radius);
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow: auto;
            position: relative;
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 30px;
            color: white;
            cursor: pointer;
            background: rgba(0,0,0,0.5);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
        }
        
        .modal-image {
            width: 100%;
            max-height: 60vh;
            object-fit: cover;
            display: block;
        }
        
        .modal-info {
            padding: 2rem;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }
    `;
    document.head.appendChild(style);
    
    // Clean up styles when modal closes
    modal.addEventListener('close', function() {
        document.head.removeChild(style);
    });
}

function toggleGalleryView() {
    const container = document.getElementById('gallery-container');
    if (container.classList.contains('compact-view')) {
        container.classList.remove('compact-view');
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    } else {
        container.classList.add('compact-view');
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
    }
}

function updateGalleryStats(totalPhotos) {
    const container = document.getElementById('stats-container');
    if (!container) return;
    
    const views = Math.floor(totalPhotos * 15);
    const favorites = Math.floor(totalPhotos * 3);
    
    container.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <h4>${totalPhotos}</h4>
                <p>Photos</p>
            </div>
            <div class="stat-card">
                <h4>${views}</h4>
                <p>Total Views</p>
            </div>
            <div class="stat-card">
                <h4>${favorites}</h4>
                <p>Favorites</p>
            </div>
        </div>
    `;
}

// Contact Page Functions
function initializeContactPage() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        initializeFormValidation();
    }
    
    // Load message count
    updateMessageCount();
}

function initializeFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
}

function validateField(field) {
    const errorId = `${field.id}-error`;
    const errorElement = document.getElementById(errorId);
    
    if (!field.value.trim()) {
        showError(field, 'This field is required', errorElement);
        return false;
    }
    
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            showError(field, 'Please enter a valid email address', errorElement);
            return false;
        }
    }
    
    clearError(field);
    return true;
}

function showError(field, message, errorElement) {
    field.style.borderColor = '#e74c3c';
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearError(field) {
    field.style.borderColor = '';
    const errorId = `${field.id}-error`;
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const requiredFields = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    // Validate all required fields
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showFormMessage('Please fix the errors in the form.', 'error');
        return;
    }
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        hikingLevel: document.getElementById('hiking-level').value,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage (simulating form submission)
    saveFormSubmission(formData);
    
    // Show success message
    showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
    
    // Reset form
    form.reset();
    
    // Update message count
    updateMessageCount();
}

function saveFormSubmission(formData) {
    // Get existing submissions or create empty array
    let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    
    // Add new submission
    submissions.push(formData);
    
    // Save back to localStorage
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    
    // Update session count
    let sessionCount = parseInt(localStorage.getItem('sessionMessageCount')) || 0;
    sessionCount++;
    localStorage.setItem('sessionMessageCount', sessionCount.toString());
}

function showFormMessage(message, type) {
    const messageElement = document.getElementById('form-message');
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.className = `form-message ${type}`;
        messageElement.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
}

function updateMessageCount() {
    const countElement = document.getElementById('message-count');
    if (countElement) {
        let sessionCount = parseInt(localStorage.getItem('sessionMessageCount')) || 0;
        countElement.textContent = sessionCount;
    }
}

// Set last modified date in footer
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

// Utility function for template literals demonstration
function formatGreeting(name, hikeCount) {
    // Demonstrating template literals as required
    return `Hello ${name}! You've logged ${hikeCount} ${hikeCount === 1 ? 'hike' : 'hikes'} with us.`;
}

// Example usage of template literals and array methods
function processHikeData(hikes) {
    // Using array methods as required
    const totalDistance = hikes.reduce((sum, hike) => sum + hike.distance, 0);
    const hikeNames = hikes.map(hike => hike.name);
    const difficultHikes = hikes.filter(hike => hike.difficulty === 'hard');
    
    // Using template literals as required
    return `
        Total distance: ${totalDistance} miles
        Number of hikes: ${hikes.length}
        Difficult hikes: ${difficultHikes.length}
        All hikes: ${hikeNames.join(', ')}
    `;
}