
class CountdownTimer {
    constructor({ intervalId, targetDate, selector = null }) {
        this.intervalId = intervalId,
        this.targetDate = targetDate,
        this.selector = selector
    }

    start() {
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = this.targetDate - currentTime;

            this.updateTimer(deltaTime);
            
            if (deltaTime <= 0) {
                this.stop();
                return;
            }
            
        },1000);
    }

    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.updateTimer(0);
    }

    updateTimer(time) {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = this.pad(
            Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        );
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

        const timerRef = document.querySelector(this.selector);
        // const timerRef = document.querySelector('#timer-1');
        const daysRef = timerRef.querySelector('[data-value="days"]');
        const hoursRef = timerRef.querySelector('[data-value="hours"]');
        const minsRef = timerRef.querySelector('[data-value="mins"]');
        const secsRef = timerRef.querySelector('[data-value="secs"]');

        daysRef.textContent = `${days}`;
        hoursRef.textContent = `${hours}`;
        minsRef.textContent = `${mins}`;
        secsRef.textContent = `${secs}`;
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }

}

const  newCountdownTimer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 13, 2021'),
});

newCountdownTimer.start();