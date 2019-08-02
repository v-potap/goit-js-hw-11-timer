import CountdownTimer from './timer.js';

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2020'),
});

document.querySelector('#target-date').defaultValue = '2019-07-17T00:00';

document
  .querySelector('.steer-timer')
  .addEventListener('click', handleClickOnForm);

function handleClickOnForm(e) {
  const domRefs = {
    form: document.querySelector('.steer-timer'),
    targetDateInput: document.querySelector('#target-date'),
    startButton: document.querySelector('button[data-action="start"]'),
    stopButton: document.querySelector('button[data-action="stop"]'),
    pauseButton: document.querySelector('button[data-action="pause"]'),
  };

  switch (e.target) {
    case domRefs.startButton:
      e.preventDefault();
      console.log(domRefs.targetDateInput.value);
      countdownTimer.setTargetDate(domRefs.targetDateInput.value);
      countdownTimer.start();
      domRefs.targetDateInput.disabled = true;
      domRefs.startButton.disabled = true;
      domRefs.stopButton.disabled = false;
      domRefs.pauseButton.disabled = false;
      break;
    case domRefs.stopButton:
      e.preventDefault();
      countdownTimer.stop();
      domRefs.targetDateInput.disabled = false;
      domRefs.startButton.disabled = false;
      domRefs.stopButton.disabled = true;
      domRefs.pauseButton.disabled = true;
      break;
    case domRefs.pauseButton:
      e.preventDefault();
      break;
    default:
      break;
  }
}

// countdownTimer.start();
