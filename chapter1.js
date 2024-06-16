// import statement
import { createScratchCard } from './scratchCard.js';

// Variables
const submitBtn = document.getElementById("submit");
const inputs = document.querySelectorAll("input");
const resultTextArea = document.getElementById("result-area");
const modal = document.getElementById("modal");
const companionButtons = document.querySelectorAll(".pet-btn");
const crossBtn = document.querySelector(".cross");
let hasCompanion = false;
let companionName = "";
let companionImgPath = "";
const userCompanionImg = document.getElementById("user-companion-image")
const userCompanionName = document.getElementById("user-companion-name")

// Event listeners
window.addEventListener('load', showTip);
document.addEventListener("DOMContentLoaded", loadRandomImages);
document.addEventListener('click', musicPlay);
document.addEventListener("DOMContentLoaded", setupAudioPlayer);
submitBtn.addEventListener("click", checkAnswers);
window.addEventListener('scroll', handleScroll);
companionButtons.forEach(button => button.addEventListener("click", companionAssign));
crossBtn.addEventListener("click", closeModal);

// Initialize scratch card
document.addEventListener('DOMContentLoaded', function() {
    createScratchCard("scratch-card1", "gold");
});

// Functions

// Show tip animation on page load
function showTip() {
    const tip = document.querySelector('.tip');
    tip.classList.add('show');

    // Remove the tip from the DOM after 2 seconds
    setTimeout(() => {
        tip.remove();
    }, 2000);
}

// Load new images at every refresh
function loadRandomImages() {
    const images = document.querySelectorAll(".random-img");

    images.forEach(img => {
        const randomIndex = Math.floor(Math.random() * 15);
        const path = img.getAttribute("data-path");
        img.src = `${path}${randomIndex}.jpg`;
    });
}

// Play music on background click
function musicPlay() {
    document.getElementById('audioPlayer').play();
    document.removeEventListener('click', musicPlay);
}

// Setup the audio player when the page loads
import { setupAudioPlayer } from './audio.js';

// Check answers for challenge
function checkAnswers() {
    const inputs = document.querySelectorAll('input[name="book_series"]');
    let selectedValue = null;

    inputs.forEach(input => {
        if (input.checked) {
            selectedValue = input.value;
        }
    });

    if (selectedValue === "Harry Potter") {
        resultTextArea.innerHTML = `Yay, Congratulations !! You were correct.<br>Here are 3 coins to celebrate your victory.`;
        resultTextArea.style.color = "lime";
        resultTextArea.style.transform = "scale(1.1)";
    } else {
        resultTextArea.innerHTML = `Uh Oh !!! Try again.<br>Here's a tip 😉: Try googling the book names.`;
        resultTextArea.style.color = "red";
        resultTextArea.style.transform = "scale(0.9)";
    }

    setTimeout(() => {
        resultTextArea.style.transform = "scale(1)";
    }, 1000);
}

// Get scroll percentage for modal popup
function getScrollPercent() {
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
}

function handleScroll() {
    let scrollPercent = parseFloat(getScrollPercent().toFixed(2));
    console.log('Scroll Percentage: ' + scrollPercent + '%');

    if (scrollPercent >= 84.5 && scrollPercent <= 93.00) {
        console.log("Great, it's working!!");

        if (hasCompanion) {
            console.log("You have already chosen your companion.");
        } else {
            showModal();
        }
    }
}

// Assign companion
function companionAssign(e) {
    hasCompanion = true;
    companionName = e.target.textContent.trim(); // Trim whitespace for proper string matching.

    if (companionName === "Baby Griffin") {
        companionImgPath = "images/user-companion/Griffin.svg";
    } else if (companionName === "Baby Dragon") {
        companionImgPath = "images/user-companion/Dragon.svg";
    } else if (companionName === "Baby Phoenix") {
        companionImgPath = "images/user-companion/Phoenix.svg";
    } else {
        console.error("Unexpected companion name:", companionName);
        return; // Exit function if name doesn't match expected values
    }

    console.log(`Companion image path: ${companionImgPath}`);
    console.log(`Companion selected: ${companionName}`);

    setTimeout(function () {
        modal.innerHTML = `
        <div class = "modal-inner">
        <span> You've chosen: <span> 
        <br>
        <img src="${companionImgPath}" alt="Photo of ${companionName}" class="user-companion-img">
        </div>
        `;
    }, 1200);
    setTimeout(closeModal, 4500);

    setTimeout(function () {
        // Play the companion name: 
        const audio = new Audio(`music/${companionName}.wav`);
        audio.play();

        userCompanionImg.src = `${companionName}.jpg`
        userCompanionName.textContent = `${companionName}`
        userCompanionImg.style.display = "block"
    }, 5000)
}


// Open and close modal via cross button
function showModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}