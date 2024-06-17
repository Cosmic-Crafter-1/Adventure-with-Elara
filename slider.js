const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth; // Maximum scrollable distance in the image list

    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX; // Initial X position of the mouse
        const thumbPosition = scrollbarThumb.offsetLeft; // Initial left offset of the scrollbar thumb
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth; // Maximum left position for the scrollbar thumb within its container

        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX; // Calculate the horizontal distance moved by the mouse
            const newThumbPosition = thumbPosition + deltaX; // New thumb position is the initial position plus the distance moved

            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition)); // Bound the new position between 0 and maxThumbPosition
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft; // Calculate the corresponding scroll position in the image list
            
            scrollbarThumb.style.left = `${boundedPosition}px`; // Update the thumb position
            imageList.scrollLeft = scrollPosition; // Update the image list scroll position
        }

        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1; // Determine the scroll direction based on button id
            const scrollAmount = imageList.clientWidth * direction; // Calculate the amount to scroll based on the image list width and direction
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" }); // Scroll the image list by the calculated amount
        });
    });

    // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        // Hide previous button if scrolled to the start, else show it
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        // Hide next button if scrolled to the end, else show it
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }

    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft; // Current scroll position of the image list
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth); // Calculate new thumb position
        scrollbarThumb.style.left = `${thumbPosition}px`; // Update the thumb position
    }

    // Call these two functions when the image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition(); // Update the thumb position based on the scroll position
        handleSlideButtons(); // Update the visibility of the slide buttons
    });


	// Adjust how many grid columns required based on image count.
	const adjustGridColumns = () => {
		const imageList = document.querySelector(".slider-wrapper .image-list");
		const images = imageList.querySelectorAll("img");
		const numImages = images.length;
	
		// Calculate the number of columns based on the number of images
		const numColumns = Math.min(10, numImages); // Limit to maximum 10 columns
	
		// Update the grid-template-columns property
		imageList.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`;
	};
	
	// Call adjustGridColumns initially and on window resize
	window.addEventListener("resize", adjustGridColumns);
	window.addEventListener("load", adjustGridColumns); // Ensure it's called when images are loaded
	
}

// Initialize slider on window resize and load events
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);
