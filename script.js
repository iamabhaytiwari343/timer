const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const timerElement = document.getElementById('timer');
const minutesInput = document.getElementById('minutesInput');

let intervalId = null;  // Store interval ID for proper clearing
let remainingTime = null;  // Updated name for clarity

function startTimer(minutes) {
  if (isNaN(minutes) || minutes <= 0) {
    return;  // Handle invalid input gracefully
  }

  const endTime = Date.now() + minutes * 60 * 1000;

  intervalId = setInterval(() => {
    remainingTime = endTime - Date.now();

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      intervalId = null;  // Reset for clarity
      timerElement.textContent = '00:00';
      return;
    }

    const minutesLeft = Math.floor(remainingTime / (1000 * 60));
    const secondsLeft = Math.floor((remainingTime / 1000) % 60);

    const formattedMinutes = minutesLeft.toString().padStart(2, '0');
    const formattedSeconds = secondsLeft.toString().padStart(2, '0');

    timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
  }, 1000);
}

startBtn.addEventListener('click', () => {
  const minutes = parseInt(minutesInput.value, 10);
  minutesInput.value = '';  // Clear input field after starting

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;  // Reset for clarity
  }

  startTimer(minutes);
});

pauseBtn.addEventListener('click', () => {
  if (intervalId) {
    clearInterval(intervalId);
    remainingTime = endTime - Date.now();  // Store remaining time
  }
});

resetBtn.addEventListener('click', () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;  // Reset for clarity
  }
  remainingTime = null;  // Reset remaining time
  timerElement.textContent = '00:00';
  minutesInput.value = '';
});
