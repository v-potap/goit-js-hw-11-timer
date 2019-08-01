export class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.htmlMarkupRefs = {
      divTimer: document.getElementById(this.selector),
      spanDays: divTimer.querySelector('[data-value]="days"'),
      spanHours: divTimer.querySelector('[data-value]="hours"'),
      spanMins: divTimer.querySelector('[data-value]="mins"'),
      spanSecs: divTimer.querySelector('[data-value]="secs"'),
    };

    for (const ref of this.htmlMarkupRefs) {
      if (!ref) {
        import htmlPattern from './timerHTML';
        throw new Error(
          `Invalid HTML, use markup pattern provided below:\n${htmlPattern}`,
        );
      }
    }

    this.targetDate = Date.parse(targetDate);
    this.timerID = 0;
    this.timer = this.getTime();
  }

  getTimer() {
    const time = Math.max(this.targetDate - Date.parse(new Date()), 0);
    const days = (Math.floor(time / (1000 * 60 * 60 * 24)) + '').trim();
    const hours = (
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + ''
    ).padStart(2, '0');
    const mins = (
      Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)) + ''
    ).padStart(2, '0');
    const secs = (Math.floor((time % (1000 * 60)) / 1000) + '').padStart(
      2,
      '0',
    );

    return { time, days, hours, mins, secs };
  }

  start() {
    this.timerID = setInterval(() => {this.applyTime}, 900);
  }

  stop() {
    clearInterval(this.timerID);
  }

  applyTimer() {
    const timer = this.getTimer();

for (const key in Object.keys(timer)) {
  switch (key) {
case 'days':
if (timer.days.length !== this.htmlMarkupRefs.spanDays.querySelectorAll('span').length) {
this.htmlMarkupRefs.spanDays.
}
[...timer.days].forEach(()=>{

})
default: break;
  };

  }
}

  }
}
