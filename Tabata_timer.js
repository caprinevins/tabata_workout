let countdown;
let interval;
let roundsRemaining = 8;
let timerElement = document.getElementById("timer");
let statusElement = document.getElementById("status");
let roundsRemainingElement = document.getElementById("roundsRemaining");
let startButton = document.getElementById("startButton");

function startTabata() {
    statusElement.textContent = "Working";
    interval = 20;
    startCountdown();

    countdown = setInterval(() => {
        interval--;

        if (interval <= 5) {
            shakeButton();
        }

        if (interval === 0) {
            if (statusElement.textContent === "Working") {
                statusElement.textContent = "Resting";
                interval = 10;
                roundsRemaining--;
                roundsRemainingElement.textContent = `Rounds remaining: ${roundsRemaining}`;
                if (roundsRemaining === 0) {
                    clearInterval(countdown);
                    congratulateUser();
                    return;
                }
            } else {
                statusElement.textContent = "Working";
                interval = 20;
            }
        }

        updateTimerDisplay(interval);
    }, 1000);
}

function updateTimerDisplay(interval) {
    let minutes = Math.floor(interval / 60);
    let seconds = interval % 60;
    timerElement.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function shakeButton() {
    const shakeDuration = 0.1;
    gsap.to(startButton, {duration: shakeDuration, x: -10});
    gsap.to(startButton, {duration: shakeDuration, x: 10, delay: shakeDuration});
    gsap.to(startButton, {duration: shakeDuration, x: 0, delay: shakeDuration * 2});
}

function congratulateUser() {
    statusElement.textContent = "Congratulations!";
    timerElement.textContent = "Tabata workout completed";
    roundsRemainingElement.style.display = "none";
    startButton.textContent = "Start another workout";
    startButton.onclick = () => {
        roundsRemaining = 8;
        roundsRemainingElement.textContent = `Rounds remaining: ${roundsRemaining}`;
        roundsRemainingElement.style.display = "block";
        startButton.textContent = "Start";
        startTabata();
    };
}
