class Timer {
    constructor(durationInput, startButton, pauseButton) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {
        this.tick();
        this.interval = setInterval(this.tick, 1000);

    }

    pause = () => {
        clearInterval(this.interval);
    }

    tick = () => {
        this.timeRemaining = this.timeRemaining- 1;
    }

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time;
    }

}

const durationInput = document.getElementById("durationInput");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");

const timer = new Timer(durationInput, startButton, pauseButton);

