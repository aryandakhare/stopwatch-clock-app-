// Clock Functionality
const timeElement = document.getElementById('time');
const toggleFormatBtn = document.getElementById('toggleFormat');
let is24HourFormat = false;

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    
    if (!is24HourFormat) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        timeElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${ampm}`;
    } else {
        timeElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }
}

function padZero(num) {
    return num < 10 ? `0${num}` : num;
}

toggleFormatBtn.addEventListener('click', () => {
    is24HourFormat = !is24HourFormat;
    toggleFormatBtn.textContent = is24HourFormat ? 'Switch to 12H' : 'Switch to 24H';
});

// Stopwatch Functionality
const stopwatchElement = document.getElementById('stopwatch');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function updateStopwatch() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    stopwatchElement.textContent = formatTime(elapsedTime);
}

startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateStopwatch, 1000);
        startStopBtn.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    stopwatchElement.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    lapsContainer.innerHTML = '';
    elapsedTime = 0;
    isRunning = false;
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = document.createElement('div');
        lapTime.className = 'lap-item';
        lapTime.textContent = `Lap ${lapsContainer.children.length + 1}: ${formatTime(elapsedTime)}`;
        lapsContainer.prepend(lapTime);
    }
});

// Dark Mode Toggle
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Initialize
setInterval(updateClock, 1000);
updateClock();