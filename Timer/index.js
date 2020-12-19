

class Timer {
    constructor(durationInput, startButton, pauseButton) {
        durationInput;
        startButton;
        pauseButton;

        //this.startButton.addEventListener('click', this.start.bind(this));
        this.startButton.addEventListener('click', this.start);
    }





    start = () => {
        //note: this will bind to button when start is called by event listener
        //f.call( {o} ) and f.apply( {o} ) will use {o} as this.
        //but for reasons, if we use an arrow function, it will bind the the class instance

        console.log(this);

    }

    pause() {

    }

    onDurationChange() {

    }

    tick() {

    }
}

const durationInput = document.getElementById("durationInput");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");

const timer = new Timer(durationInput, startButton, pauseButton);


timer.start();
