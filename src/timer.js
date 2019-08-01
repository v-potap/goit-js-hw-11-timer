'use strict';
import htmlPattern from './timerHTML.js';

export default class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    // this.divTimer = document.getElementById(this.selector.slice(1));
    this.htmlMarkupRefs = {
      divTimer: document.getElementById(this.selector.slice(1)),
      spanDays: document
        .getElementById(this.selector.slice(1))
        .querySelector('span[data-value="days"]'),
      spanDays: document
        .getElementById(this.selector.slice(1))
        .querySelector('span[data-value="days"]'),
      spanHours: document
        .getElementById(this.selector.slice(1))
        .querySelector('span[data-value="hours"]'),
      spanMins: document
        .getElementById(this.selector.slice(1))
        .querySelector('span[data-value="mins"]'),
      spanSecs: document
        .getElementById(this.selector.slice(1))
        .querySelector('span[data-value="secs"]'),
    };

    for (const ref in this.htmlMarkupRefs) {
      if (this.htmlMarkupRefs[ref] === null) {
        throw new Error(
          `Invalid HTML, instance "${ref}" not defined, use markup pattern provided below:\n${htmlPattern}`,
        );
      }
    }

    this.targetDate = Date.parse(targetDate);
    this.timerID = 0;
    this.timer = this.getTimer();
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
    this.timerID = setInterval(() => {
      this.applyTimer();
    }, 900);
  }

  stop() {
    clearInterval(this.timerID);
  }

  applyTimer() {
    const timer = this.getTimer();
    console.log(timer);
    for (const key of Object.keys(timer)) {
      switch (key) {
        case 'days':
            this.htmlMarkupRefs.spanDays.textContent = timer.days;
          // while (
          //   timer.days.length !==
          //   this.htmlMarkupRefs.spanDays.querySelectorAll('span').length
          // ) {
          //   if (
          //     timer.days.length >
          //     this.htmlMarkupRefs.spanDays.querySelectorAll('span').length
          //   ) {
          //     const newDigit = this.htmlMarkupRefs.spanDays.appendChild('span');
          //     newDigit.classList.add = 'digit';
          //   }
          // }
          // [...timer.days].forEach(() => {});
          break;
        case 'hours':
          this.htmlMarkupRefs.spanHours.textContent = timer.hours;
          break;
        case 'mins':
          this.htmlMarkupRefs.spanMins.textContent = timer.mins;
          break;
        case 'secs':
          this.htmlMarkupRefs.spanSecs.textContent = timer.secs;
          break;
        default:
          break;
      }
    }
  }
}
