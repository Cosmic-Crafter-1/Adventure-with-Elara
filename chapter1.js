

const submitBtn = document.getElementById("submit")
const inputs = document.querySelectorAll("input")
const resultTextArea = document.getElementById("result-area")

// Add an event listener to start the animation on page load
window.addEventListener('load', showTip);

function showTip() {
    const tip = document.querySelector('.tip');
    tip.classList.add('show');

    // Remove the tip from the DOM after 2 seconds
    setTimeout(() => {
        tip.remove();
    }, 2000);
}

/* Load new images at every refresh. */

document.addEventListener("DOMContentLoaded", function () {

    const images = document.querySelectorAll(".random-img");

    images.forEach(img => {
        const randomIndex = Math.floor(Math.random() * 15);
        // Generates a random number between 0 and 3
        const path = img.getAttribute("data-path");
        img.src = `${path}${randomIndex}.jpg`;
    });
});

/* Play music on background click */

document.addEventListener('click', musicPlay);
function musicPlay() {
    document.getElementById('audioPlayer').play();
    document.removeEventListener('click', musicPlay);
}

/* Narrate */


import { setupAudioPlayer } from './audio.js';

// Setup the audio player when the page loads
document.addEventListener("DOMContentLoaded", () => {
    setupAudioPlayer();
});

const playBtn = document.getElementById("play-btn");

// Play button click event
playBtn.addEventListener("click", narrate);

function narrate() {
    playAudio(); // Call the function to play audio
}

// If you have a pause button, you can add an event listener like this:
const pauseBtn = document.getElementById("pause-btn");
pauseBtn.addEventListener("click", () => {
    pauseAudio(); // Call the function to pause audio
});





















/* Check answers for challenge */

submitBtn.addEventListener("click", function () {
    // Get all the radio inputs
    const inputs = document.querySelectorAll('input[name="book_series"]');
    let selectedValue = null;

    // Find the selected radio button
    inputs.forEach(input => {
        if (input.checked) {
            selectedValue = input.value;
        }
    });

    // Check the selected value and update the result text area accordingly
    if (selectedValue === "Harry Potter") {
        resultTextArea.innerHTML =
            `Yay, Congratulations !! You were correct.
             <br> 
            Here are 3 coins to celebrate your victory.`;
        resultTextArea.style.color = "lime";
        resultTextArea.style.transform = "scale(1.1)";
    } else {
        resultTextArea.innerHTML =
            `Uh Oh !!! Try again. 
             <br>
            Here's a tip 😉: Try googling the book names.`;
        resultTextArea.style.color = "red";
        resultTextArea.style.transform = "scale(0.9)";
    }

    // Reset the transform after the transition
    setTimeout(() => {
        resultTextArea.style.transform = "scale(1)";
    }, 1000);
});








