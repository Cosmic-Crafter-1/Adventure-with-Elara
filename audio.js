// Credits : 
// Song by <a href="https://stocktune.com/free-music/sunny-days-ahead-19392-32728">StockTune</a>

// Song by <a href="https://stocktune.com/free-music/awakening-morning-glow-53791-50339">StockTune</a>

// Song by <a href="https://stocktune.com/free-music/hearts-speak-softly-52930-49906">StockTune</a>

let musicIndex = Math.floor(Math.random() * 4)

export function setupAudioPlayer() {
    const audioPlayer = document.querySelector(".audio-player");
    const audio = new Audio(`music/${musicIndex}.mp3`);

    audio.addEventListener(
        "loadeddata",
        () => {
            audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
                audio.duration
            );
            audio.volume = 0.75; // Set initial volume to 75%
            audio.play(); // Autoplay the audio
            togglePlayPause(); // Update play/pause button state
        },
        false
    );

    // Function to toggle play/pause button state
    function togglePlayPause() {
        const playBtn = audioPlayer.querySelector(".controls .toggle-play");
        if (audio.paused) {
            playBtn.classList.remove("pause");
            playBtn.classList.add("play");
        } else {
            playBtn.classList.remove("play");
            playBtn.classList.add("pause");
        }
    }

    // Click on timeline to skip around
    const timeline = audioPlayer.querySelector(".timeline");
    timeline.addEventListener("click", e => {
        const timelineWidth = window.getComputedStyle(timeline).width;
        const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
        audio.currentTime = timeToSeek;
    }, false);

    // Click volume slider to change volume
    const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
    volumeSlider.addEventListener('click', e => {
        const sliderWidth = window.getComputedStyle(volumeSlider).width;
        const newVolume = e.offsetX / parseInt(sliderWidth);
        audio.volume = newVolume;
        audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
    }, false);

    // Check audio percentage and update time accordingly
    setInterval(() => {
        const progressBar = audioPlayer.querySelector(".progress");
        progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
        audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
            audio.currentTime
        );
    }, 500);

    // Toggle between playing and pausing on button click
    const playBtn = audioPlayer.querySelector(".controls .toggle-play");
    playBtn.addEventListener(
        "click",
        () => {
            if (audio.paused) {
                playBtn.classList.remove("play");
                playBtn.classList.add("pause");
                audio.play();
            } else {
                playBtn.classList.remove("pause");
                playBtn.classList.add("play");
                audio.pause();
            }
        },
        false
    );

    // Loop the audio when it ends
    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
    });

    audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
        const volumeEl = audioPlayer.querySelector(".volume-container .volume");
        audio.muted = !audio.muted;
        if (audio.muted) {
            volumeEl.classList.remove("icono-volumeMedium");
            volumeEl.classList.add("icono-volumeMute");
        } else {
            volumeEl.classList.add("icono-volumeMedium");
            volumeEl.classList.remove("icono-volumeMute");
        }
    });

    // Turn seconds into time format (e.g., 128 seconds into 2:08)
    function getTimeCodeFromNum(num) {
        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;

        if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, '0')}`;
        return `${String(hours).padStart(2, '0')}:${minutes}:${String(seconds % 60).padStart(2, '0')}`;
    }
}
