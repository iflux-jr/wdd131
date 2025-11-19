// Footer
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// Static values required by assignment
const T = 10;  // °C
const S = 5;   // km/h

// One-line wind chill (Metric formula)
const calcWC = (t,s)=> (13.12 + 0.6215*t - 11.37*Math.pow(s,.16) + 0.3965*t*Math.pow(s,.16)).toFixed(1);

// Only calculate if valid
function setWindChill(id){
  const el = document.getElementById(id);
  el.textContent = (T<=10 && S>4.8) ? `${calcWC(T,S)} °C` : "N/A";
}

// Apply to desktop + mobile
["windchill","windchill-m"].forEach(setWindChill);

// Keep displayed values synced
document.getElementById("temp").textContent = T;
document.getElementById("wind").textContent = S;
document.getElementById("temp-m").textContent = T;
document.getElementById("wind-m").textContent = S;
