import htmlPattern from './timerHTML.js';

export default class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    // this.divTimer = document.getElementById(this.selector.slice(1));
    this.htmlMarkupRefs = {
      divTimer: document.getElementById(this.selector.slice(1)),
      days: document
        .getElementById(this.selector.slice(1))
        .querySelector('span[data-value="days"]'),
      hours: document
        .getElementById(this.selector.slice(1))
        .querySelector('span[data-value="hours"]'),
      mins: document
        .getElementById(this.selector.slice(1))
        .querySelector('span[data-value="mins"]'),
      secs: document
        .getElementById(this.selector.slice(1))
        .querySelector('span[data-value="secs"]'),
    };

    // this.css = {
    //   divTimer: 'flip-clock',
    //   spanDays: ,
    //   spanHours: ,
    //   spanMins: ,
    //   spanSecs: ,
    // }

    for (const ref in this.htmlMarkupRefs) {
      if (this.htmlMarkupRefs[ref] === null) {
        throw new Error(
          `Invalid HTML, instance "${ref}" not defined, use markup pattern provided below:\n${htmlPattern}`,
        );
      }
    }

    const applyTimerStyles = new Promise(resolve => {
      this.htmlMarkupRefs.divTimer.style.display = 'flex';
      this.htmlMarkupRefs.divTimer.style.justifyContent = 'space-between';
      this.htmlMarkupRefs.divTimer.style.width = '80vw';
      this.htmlMarkupRefs.divTimer.style.margin = '5vh auto';
      this.htmlMarkupRefs.divTimer.style.height = '20vh';
      this.htmlMarkupRefs.divTimer.style.border = 'solid';
      this.htmlMarkupRefs.divTimer.style.borderRadius = '2vh';

      for (const ref of this.htmlMarkupRefs.divTimer.children) {
        ref.style.display = 'flex';
        ref.style.flexDirection = 'column';
        ref.style.justifyContent = 'center';
        ref.style.alignItems = 'center';
        ref.style.height = 'auto';
        ref.style.flex = '0 1 15vh';
        ref.style.margin = '1vh 1vw';
        ref.style.border = 'solid';
        ref.style.borderRadius = '2vh';

        for (const span of ref.children) {
          if (span.classList.contains('value')) {
            span.style.display = 'flex';
            span.style.justifyContent = 'space-around';
            span.style.minHeight = '5vh';
            span.style.flex = '1 1 5vw';
            span.style.margin = '1vh 1vw';
            span.style.border = '0.25vh solid';
            span.style.borderRadius = '2vh';
            span.style.fontSize = '8vh';
            span.style.fontWeight = 'bold';
          } else if (span.classList.contains('label')) {
            span.style.display = 'block';
            span.style.margin = '1vh 1vw';
            span.style.maxHeight = '4vh';
          }
        }
      }
    });

    if (Date.parse(targetDate) < Date.parse(new Date())) {
      throw new Error(`Invalid target date provided (expired): ${targetDate}`);
    }

    this.targetDate = Date.parse(targetDate);
    this.targetYear = targetDate.getFullYear();
    this.targetMonth = targetDate.getMonth() + 1;
    this.targetDay = targetDate.getDate();
    this.targetHours = targetDate.getHours();
    this.targeMins = targetDate.getMinutes();
    this.targetSecs = targetDate.getSeconds();
    this.timerID = 0;
    this.timer = this.getTimer();
    this.isCounting = false;
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

    if (time >= 0) {
      return {
        // time,
        days,
        hours,
        mins,
        secs,
      };
    }
  }

  start() {
    this.timerID = setInterval(() => {
      this.applyTimer();
    }, 1000);

    this.isCounting = true;
  }

  stop() {
    clearInterval(this.timerID);
    this.isCounting = false;
  }

  applyTimer() {
    const timer = this.getTimer();
    if (!timer) {
      this.stop();
      return;
    }

    for (const key of Object.keys(timer)) {
      if (!this.htmlMarkupRefs[key].hasAttribute('data-value')) {
        this.htmlMarkupRefs[key].setAttribute('data-value', timer[key]);
      } else if (
        this.htmlMarkupRefs[key].getAttribute('data-value') !== timer[key]
      ) {
        this.applySlot(this.htmlMarkupRefs[key], [...timer[key]]);
      }
    }
  }

  applySlot(domRef, digits) {
    domRef.setAttribute('data-value', digits.join(''));

    while (digits.length > domRef.children.length) {
      const digit = domRef.appendChild(document.createElement('span'));
    }

    while (digits.length < domRef.children.length) {
      domRef.removeChild(domRef.childNodes[0]);
    }

    digits.forEach((e, i, a) => {
      if (!domRef.children[i].hasAttribute('data-value')) {
        domRef.children[i].setAttribute('data-value', e);
      } else if (domRef.children[i].getAttribute('data-value') !== e) {
        domRef.children[i].setAttribute('data-value', e);
      }

      domRef.children[i].textContent = domRef.children[i].getAttribute(
        'data-value',
      );

      domRef.children[i].style.background = 'darkgrey';
      domRef.children[i].style.color = 'grey';
      domRef.children[i].style.width = '6vw';
      domRef.children[i].style.borderRadius = '3vh';
      domRef.children[i].style.textAlign = 'center';
      domRef.children[i].style.margin = '1vh 0.25vw';

      domRef.style.width = `${a.length * 7}vw`;
      this.htmlMarkupRefs.divTimer.style.width = '90vw';
    });
  }

  isCounting() {
    return this.isCounting;
  }

  setTargetDate(targetDate) {
    if (this.isCounting) {
      return;
    }
    this.targetDate = Date.parse(targetDate);
  }

  getTargetDate() {
    return this.targetDate;
  }

  getTargetDateDefault() {
    return (
      `${this.targetYear}-` +
      `${(this.targetMonth + '').padStart(2, '0')}-` +
      `${(this.targetDay + '').padStart(2, '0')}T` +
      `${(this.targetHours + '').padStart(2, '0')}:` +
      `${(this.targeMins + '').padStart(2, '0')}:` +
      `${(this.targetSecs + '').padStart(2, '0')}`
    );
  }
}
