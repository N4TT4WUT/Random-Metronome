let isRunning = false;
let interval = null;
let bpmInterval = null;

const bpmDisplay = document.getElementById('bpm');
const startStopButton = document.getElementById('start-stop');
const durationSelect = document.getElementById('duration');
const minBPMInput = document.getElementById('min-bpm');
const maxBPMInput = document.getElementById('max-bpm');
const clickSound = document.getElementById('click');

// Ensure the audio is loaded
clickSound.load();

// Function to generate a random BPM within the user-defined range
function getRandomBPM() {
    const minBPM = parseInt(minBPMInput.value, 10);
    const maxBPM = parseInt(maxBPMInput.value, 10);

    if (minBPM >= maxBPM) {
        alert("Min BPM must be less than Max BPM.");
        return minBPM;
    }

    return Math.floor(Math.random() * (maxBPM - minBPM + 1)) + minBPM;
}

// Function to set BPM
function setBPM(bpm) {
    bpmDisplay.textContent = bpm;
    if (isRunning) {
        clearInterval(interval);
        startMetronome(bpm);
    }
}

// Function to start the metronome
function startMetronome(bpm) {
    const intervalTime = 60000 / bpm; // Convert BPM to milliseconds
    interval = setInterval(() => {
        clickSound.currentTime = 0; // Reset audio to the beginning
        clickSound.play().catch(error => console.error('Audio playback error:', error));
    }, intervalTime);
}

// Function to randomize BPM while playing
function startRandomizingBPM() {
    const duration = parseInt(durationSelect.value, 10); // Get the user-selected duration
    bpmInterval = setInterval(() => {
        const randomBPM = getRandomBPM();
        setBPM(randomBPM);
    }, duration);
}

// Toggle start/stop
startStopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        clearInterval(bpmInterval);
        startStopButton.textContent = 'Start';
    } else {
        const initialBPM = getRandomBPM();
        setBPM(initialBPM);
        startRandomizingBPM();
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});
