// scripts/filtered-temples.js
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Set last modified date in footer
    const lastModifiedSpan = document.getElementById('last-modified');
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }
    
    // NUCLEAR OPTION - Most basic working version
document.getElementById('hamburger-btn').onclick = function() {
    var nav = document.getElementById('main-nav');
    var btn = document.getElementById('hamburger-btn');
    
    if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        btn.classList.remove('active');
    } else {
        nav.classList.add('active');
        btn.classList.add('active');
    }
};

    // Temple data array
    const temples = [
        {
            templeName: "Aba Nigeria",
            location: "Aba, Nigeria",
            dedicated: "2005, August, 7",
            area: 11500,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
        },
        {
            templeName: "Manti Utah",
            location: "Manti, Utah, United States",
            dedicated: "1888, May, 21",
            area: 74792,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
        },
        {
            templeName: "Payson Utah",
            location: "Payson, Utah, United States",
            dedicated: "2015, June, 7",
            area: 96630,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
        },
        {
            templeName: "Yigo Guam",
            location: "Yigo, Guam",
            dedicated: "2020, May, 2",
            area: 6861,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
        },
        {
            templeName: "Washington D.C.",
            location: "Kensington, Maryland, United States",
            dedicated: "1974, November, 19",
            area: 156558,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
        },
        {
            templeName: "Lima Perú",
            location: "Lima, Perú",
            dedicated: "1986, January, 10",
            area: 9600,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
        },
        {
            templeName: "Mexico City Mexico",
            location: "Mexico City, Mexico",
            dedicated: "1983, December, 2",
            area: 116642,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
        },
        // Additional temples (3+ as required)
        {
            templeName: "Salt Lake City Utah",
            location: "Salt Lake City, Utah, United States",
            dedicated: "1893, April, 6",
            area: 253000,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
        },
        {
            templeName: "Rome Italy",
            location: "Rome, Italy",
            dedicated: "2019, March, 10",
            area: 41010,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x225/rome-italy-temple-exterior-2018-1221314-wallpaper.jpg"
        },
        {
            templeName: "Kona Hawaii",
            location: "Kailua-Kona, Hawaii, United States",
            dedicated: "2000, January, 23",
            area: 9650,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/kona-hawaii/400x250/kona-hawaii-temple-lds-275883-wallpaper.jpg"
        },
        {
            templeName: "Copenhagen Denmark",
            location: "Copenhagen, Denmark",
            dedicated: "2004, May, 23",
            area: 25000,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/copenhagen-denmark/400x250/copenhagen-denmark-temple-1073718-wallpaper.jpg"
        },
        {
            templeName: "Manila Philippines",
            location: "Manila, Philippines",
            dedicated: "1984, September, 25",
            area: 26783,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manila-philippines/400x250/manila-philippines-temple-lds-129562-wallpaper.jpg"
        }
    ];

    // DOM elements
    const albumGrid = document.getElementById('album-grid');
    const navLinks = document.querySelectorAll('nav a');

    // Function to create temple card
    function createTempleCard(temple) {
        const card = document.createElement('div');
        card.className = 'temple-card';
        
        card.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
            <div class="temple-info">
                <h3>${temple.templeName}</h3>
                <p><strong>Location:</strong> ${temple.location}</p>
                <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
            </div>
        `;
        
        return card;
    }

    // Function to display temples based on filter
    function displayTemples(filter = 'all') {
        // Clear existing content
        albumGrid.innerHTML = '';
        
        let filteredTemples = temples;
        
        switch(filter) {
            case 'old':
                filteredTemples = temples.filter(temple => {
                    const year = parseInt(temple.dedicated.split(',')[0]);
                    return year < 1900;
                });
                break;
            case 'new':
                filteredTemples = temples.filter(temple => {
                    const year = parseInt(temple.dedicated.split(',')[0]);
                    return year > 2000;
                });
                break;
            case 'large':
                filteredTemples = temples.filter(temple => temple.area > 90000);
                break;
            case 'small':
                filteredTemples = temples.filter(temple => temple.area < 10000);
                break;
            case 'all':
            default:
                filteredTemples = temples;
        }
        
        // Create and append temple cards
        filteredTemples.forEach(temple => {
            const card = createTempleCard(temple);
            albumGrid.appendChild(card);
        });
    }

    // Function to handle navigation clicks
    function handleNavClick(event) {
        event.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Get filter type from data attribute
        const filter = this.getAttribute('data-filter');
        
        // Update display
        displayTemples(filter);
    }

    // Add event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // Initial display (show all temples)
    displayTemples('all');
    
    // Set Home as active by default
    const homeLink = document.querySelector('a[data-filter="all"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }
});