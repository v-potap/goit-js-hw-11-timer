import CountdownTimer from './timer.js';

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Aug 17, 2019'),
});

document.querySelector('#target-date').defaultValue = countdownTimer.getTargetDateDefault();

document
  .querySelector('.steer-timer')
  .addEventListener('click', handleClickOnForm);

function handleClickOnForm(e) {
  const domRefs = {
    form: document.querySelector('.steer-timer'),
    targetDateInput: document.querySelector('#target-date'),
    startButton: document.querySelector('button[data-action="start"]'),
    stopButton: document.querySelector('button[data-action="stop"]'),
  };

  switch (e.target) {
    case domRefs.startButton:
      e.preventDefault();
      countdownTimer.setTargetDate(domRefs.targetDateInput.value);
      countdownTimer.start();
      domRefs.targetDateInput.disabled = true;
      domRefs.startButton.disabled = true;
      domRefs.stopButton.disabled = false;
      break;
    case domRefs.stopButton:
      e.preventDefault();
      countdownTimer.stop();
      domRefs.targetDateInput.disabled = false;
      domRefs.startButton.disabled = false;
      domRefs.stopButton.disabled = true;
      break;
    default:
      break;
  }
}