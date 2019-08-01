import CountdownTimer from './timer.js';

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2019'),
});

countdownTimer.start();