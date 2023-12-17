let counter;
let remainingtime;
let statusC = false;

function startTimer(min) {
    const end = Date.now() + min * 60 * 1000;

    counter = setInterval(() => {
        const tr = end - Date.now();
        if (tr <= 0) {
            clearInterval(counter);
            document.getElementById('timer').textContent = '00:00';
            return;
        }

        const leftmins = Math.floor(tr / 1000 / 60);
        const leftseconds = Math.floor((tr / 1000) % 60);

        const dm = leftmins < 10 ? '0' + leftmins : leftmins;
        const ds = leftseconds < 10 ? '0' + leftseconds : leftseconds;

        document.getElementById('timer').textContent = `${dm}:${ds}`;

        if (statusC) {
            clearInterval(counter);
            remainingtime = tr;
        }
    }, 1000);
}

document.getElementById('startBtn').addEventListener('click', () => {
    const min = parseInt(document.getElementById('minutesInput').value, 10);
    if (isNaN(min) || min <= 0) return;

    if (counter) clearInterval(counter);
    statusC = false;
    startTimer(min);
});

document.getElementById('pauseBtn').addEventListener('click', () => {
    statusC = true;
});

document.getElementById('resetBtn').addEventListener('click', () => {
    clearInterval(counter);
    document.getElementById('timer').textContent = '00:00';
    document.getElementById('minutesInput').value = '';
});
