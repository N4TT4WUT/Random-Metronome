let isRunning = false;
let nextTickTimeout = null;
let bpmChangeInterval = null;

const bpmDisplay = document.getElementById('bpm');
const startStopButton = document.getElementById('start-stop');
const durationSelect = document.getElementById('duration');
const minBPMInput = document.getElementById('min-bpm');
const maxBPMInput = document.getElementById('max-bpm');
const clickSound = document.getElementById('click');

// Ensure the audio is loaded
clickSound.load();

let currentBPM = 60;

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

// Function to play a single tick
function playTick() {
    clickSound.currentTime = 0;
    clickSound.play().catch((error) => console.error('Audio playback error:', error));

    // Schedule the next tick based on the current BPM
    const intervalTime = 60000 / currentBPM; // Convert BPM to milliseconds
    nextTickTimeout = setTimeout(playTick, intervalTime);
}

// Function to handle BPM changes without pausing the rhythm
function handleBPMChange() {
    const duration = parseInt(durationSelect.value, 10); // Get user-selected duration in milliseconds

    // Clear any previous BPM change interval
    clearInterval(bpmChangeInterval);

    // Start a new interval for BPM changes
    bpmChangeInterval = setInterval(() => {
        const newBPM = getRandomBPM();

        // Update BPM smoothly without interrupting the rhythm
        currentBPM = newBPM;
        bpmDisplay.textContent = currentBPM;
    }, duration);
}

// Toggle start/stop functionality
startStopButton.addEventListener('click', () => {
    if (isRunning) {
        // Stop the metronome
        clearTimeout(nextTickTimeout);
        clearInterval(bpmChangeInterval);
        startStopButton.textContent = 'Start';
    } else {
        // Initialize BPM and start the metronome
        currentBPM = getRandomBPM();
        bpmDisplay.textContent = currentBPM;

        // Start the metronome and BPM change logic
        playTick();
        handleBPMChange();
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});
