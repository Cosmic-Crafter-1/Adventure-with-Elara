export const createScratchCard = (canvasId, color) => {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    const scratchContainer = document.querySelector('.scratch-container');
    const eggImage = document.querySelector('.egg img');
    const eggText = document.querySelector('.egg p');
    const eggRarity = document.getElementById("egg-rarity");
    const jsConfetti = new JSConfetti();

    // Set canvas dimensions to match CSS dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const init = () => {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    let isDrawing = false;

	const scratch = (x, y) => {
		const radius = 15; 
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fill();
	};
	

    const checkScratchPercentage = () => {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;
        let scratchedPixels = 0;

        for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i + 3] === 0) { // Check alpha channel
                scratchedPixels++;
            }
        }

        const totalPixels = canvas.width * canvas.height;
        const percentageScratched = (scratchedPixels / totalPixels) * 100;

        if (percentageScratched > 70) {
            // Zoom in effect on egg image
            eggImage.style.transition = 'transform 0.5s';
            eggImage.style.transform = 'scale(1.2)';

            // Reveal entire scratch card
            setTimeout(() => {
                scratchContainer.style.userSelect = 'auto'; // Enable text selection
                eggText.style.display = 'block'; // Show the egg text (if hidden)
                // Zoom out effect on egg image
                eggImage.style.transform = 'scale(1)';
            }, 500); // Adjust timing as needed

            // Fill entire canvas to reveal all
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Optionally, disable canvas interaction after revealing
            canvas.style.pointerEvents = 'none';

            eggRarity.textContent = "LEGENDARY";

            // Confetti / Celebration on successful scratch.
            jsConfetti.addConfetti({
                emojis: ['✨', '💫'],
                emojiSize: 10,
                confettiNumber: 150,

            })
            // .then(() => jsConfetti.addConfetti({
            //     confettiNumber: 250,
            // }))
        }
    };

    const startDrawing = (event) => {
        isDrawing = true;
        scratch(getX(event), getY(event));
        checkScratchPercentage();
        event.preventDefault(); // Prevent default touch action (like scrolling)
    };

    const getX = (event) => {
        if (event.type === 'touchstart' || event.type === 'touchmove') {
            return event.touches[0].clientX - canvas.getBoundingClientRect().left;
        } else {
            return event.offsetX;
        }
    };

    const getY = (event) => {
        if (event.type === 'touchstart' || event.type === 'touchmove') {
            return event.touches[0].clientY - canvas.getBoundingClientRect().top;
        } else {
            return event.offsetY;
        }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', function(event) {
        if (isDrawing) {
            scratch(getX(event), getY(event));
            checkScratchPercentage();
        }
    });
    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
    });
    canvas.addEventListener('mouseleave', function() {
        isDrawing = false;
    });

    // Touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', function(event) {
        if (isDrawing) {
            scratch(getX(event), getY(event));
            checkScratchPercentage();
        }
    });
    canvas.addEventListener('touchend', function() {
        isDrawing = false;
    });

    init();
};
