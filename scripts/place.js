// Footer content
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// Weather data - static values matching displayed content
const temperature = 25;  // °C
const windSpeed = 8;     // km/h

// Calculate wind chill function as required
function calculateWindChill(temp, speed) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16)).toFixed(1);
}

// Calculate and display wind chill if conditions are met
function displayWindChill() {
    const windchillElement = document.getElementById('windchill');
    
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windchillElement.textContent = `${windChill} °C`;
    } else {
        windchillElement.textContent = "N/A";
    }
}

// Initialize weather display
displayWindChill();