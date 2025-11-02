// Get the current year and update the copyright
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Update the last modified date
document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;