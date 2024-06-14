document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".random-img");

    images.forEach(img => {
        const randomIndex = Math.floor(Math.random() * 15); 
		// Generates a random number between 0 and 3
        const path = img.getAttribute("data-path");
        img.src = `${path}${randomIndex}.jpg`;
    });
});

const submitBtn = document.getElementById("submit")
const inputs = document.querySelectorAll("input")
const resultTextArea = document.getElementById("result-area")

submitBtn.addEventListener("click", function() {
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


// Music Player 

import { setupAudioPlayer } from './audio.js';

// Call setupAudioPlayer function to initialize the audio player
setupAudioPlayer();



