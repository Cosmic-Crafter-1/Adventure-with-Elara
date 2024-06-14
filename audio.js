let musicIndex = Math.floor(Math.random() * 4);

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
            // Ensure autoplay
            if (!audio.paused) {
                audio.pause(); // Pause in case it's already playing to reset
            }
            audio.currentTime = 0; // Reset audio to the beginning
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
    // ... (rest of your existing code for timeline, volume slider, etc.)

    // Loop the audio when it ends
    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
    });

    // Mute/unmute button click handler
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

    // Function to convert seconds to time format
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


/* Audio CSS 

.audio-player {
	height: 50px;
	width: 350px;
	background: #444;
	box-shadow: 0 0 20px 0 #000a;
  
	font-family: arial;
	color: white;
	font-size: 0.75em;
	overflow: hidden;
  
	display: grid;
	grid-template-rows: 6px auto;
	.timeline {
	  background: white;
	  width: 100%;
	  position: relative;
	  cursor: pointer;
	  box-shadow: 0 2px 10px 0 #0008;
	  .progress {
		background: coral;
		width: 0%;
		height: 100%;
		transition: 0.25s;
	  }
	}
	.controls {
	  display: flex;
	  justify-content: space-between;
	  align-items: stretch;
	  padding: 0 20px;
  
	  > * {
		display: flex;
		justify-content: center;
		align-items: center;
	  }
	  .toggle-play {
		&.play {
		  cursor: pointer;
		  position: relative;
		  left: 0;
		  height: 0;
		  width: 0;
		  border: 7px solid #0000;
		  border-left: 13px solid white;
		  &:hover {
			transform: scale(1.1);
		  }
		}
		&.pause {
		  height: 15px;
		  width: 20px;
		  cursor: pointer;
		  position: relative;
		  &:before {
			position: absolute;
			top: 0;
			left: 0px;
			background: white;
			content: "";
			height: 15px;
			width: 3px;
		  }
		  &:after {
			position: absolute;
			top: 0;
			right: 8px;
			background: white;
			content: "";
			height: 15px;
			width: 3px;
		  }
		  &:hover {
			transform: scale(1.1);
		  }
		}
	  }
	  .time {
		display: flex;
  
		> * {
		  padding: 2px;
		}
	  }
	  .volume-container {
		cursor: pointer;
		.volume-button {
		  height: 26px;
		  display: flex;
		  align-items: center;
		  .volume {
			transform: scale(0.7);
		  }
		}
  
		position: relative;
		z-index: 2;
		.volume-slider {
		  position: absolute;
		  left: -3px;
		  top: 15px;
		  z-index: -1;
		  width: 0;
		  height: 15px;
		  background: white;
		  box-shadow: 0 0 20px #000a;
		  transition: 0.25s;
		  .volume-percentage {
			background: coral;
			height: 100%;
			width: 75%;
		  }
		}
		&:hover {
		  .volume-slider {
			left: -123px;
			width: 120px;
		  }
		}
	  }
	}
  }
  
  */