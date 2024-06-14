document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll(".random-img");

    images.forEach(img => {
        const randomIndex = Math.floor(Math.random() * 4); 
		// Generates a random number between 0 and 3
        const path = img.getAttribute("data-path");
        img.src = `${path}${randomIndex}.jpg`;
    });
});
