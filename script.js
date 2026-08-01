// Live Clock with Scramble Effect on Load
function updateClock() {
    const clockElement = document.getElementById("live-clock");
    if (!clockElement) return;
    
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    
    hours = hours % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");
    
    const timeString = `${hours}:${minutes} ${period}`;
    
    // If it's the first load, run the decrypt scramble effect
    if (!window.clockScrambled) {
        window.clockScrambled = true;
        let iteration = 0;
        const chars = "0123456789:PMAM ";
        
        let scrambleInterval = setInterval(() => {
            clockElement.textContent = timeString
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return timeString[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");
                
            if (iteration >= timeString.length) {
                clearInterval(scrambleInterval);
            }
            iteration += 1 / 2;
        }, 30);
    } else {
        // Regular normal clock update after initial load
        clockElement.textContent = timeString;
    }
}


updateClock();
setInterval(updateClock, 1000);

// Fade-in animation observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 }); 

document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
});

// Word Flipping Animation
const words = document.querySelectorAll(".flip-container .word");
let currentIndex = 0;

function flipWords() {
    if (words.length === 0) return;
    
    let currentWord = words[currentIndex];
    let nextIndex = (currentIndex + 1) % words.length;
    let nextWord = words[nextIndex];

    // Slide current word up and out
    currentWord.classList.remove("active");
    currentWord.classList.add("exit");

    // Bring next word in from below
    nextWord.classList.remove("exit");
    nextWord.classList.add("active");

    // Clean up exit class after transition finishes
    setTimeout(() => {
        currentWord.classList.remove("exit");
    }, 400);

    currentIndex = nextIndex;
}

// Start flip cycle every 3 seconds
if (words.length > 0) {
    setInterval(flipWords, 3000);
}

// Scramble / Decrypt Text Effect for Location
window.addEventListener("DOMContentLoaded", () => {
    const locElement = document.getElementById("location-text");
    if (!locElement) return;

    const targetString = "GIZA, EGYPT · 30.0131° N, 31.2089° E";
    let iteration = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·° ";
    
    let interval = setInterval(() => {
        locElement.textContent = targetString
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return targetString[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
            
        if (iteration >= targetString.length) {
            clearInterval(interval);
        }
        
        iteration += 1 / 2; 
    }, 30);
});