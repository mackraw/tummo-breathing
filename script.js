'use strict';

const inputBreaths = document.querySelector('#numBreaths');
const inputRounds = document.querySelector('#numRounds');
const inputPace = document.querySelector('#breathingPace');

// layout options to be shown and hidden
const options = document.querySelector('.options');
const secondaryBtns = document.querySelector('.secondaryBtns');
const startBtn = document.querySelector('.startBtn');
const retentionBtn = document.querySelector('.goRetentionBtn');
const stopBtn = document.querySelector('.stopBtn');

// Round info displayed to user
const roundInfo = document.querySelector('.roundInfo');
const roundNoDiv = document.querySelector('.roundNo');
const totalRoundsDiv = document.querySelector('.totalRounds');

// main display
const timerDiv = document.querySelector('.timer');
const breathDiv = document.querySelector('.breathCounter');

let speed; // assigned based on pace
let breathCounter; // interval to count breaths
let startTiming; // timer interval

startBtn.addEventListener('click', () => {
  let numBreaths = parseInt(inputBreaths.value);
  let numRounds = parseInt(inputRounds.value);
  let pace = inputPace.value;
  totalRoundsDiv.textContent = numRounds;

  // Show and hide sections
  options.classList.add('hidden');
  roundInfo.classList.remove('hidden');
  timer.classList.remove('hidden');
  secondaryBtns.classList.add('hidden');

  // Set speed
  if (pace === 'Slow') {
    speed = 6500;
  } else if (pace === 'Medium') {
    speed = 3750;
  } else {
    speed = 1500;
  }

  // Count rounds and breaths
  countRounds(numRounds, numBreaths, speed);
});

function countBreaths(numBreaths, speed) {
  return new Promise((success) => {
    displayBreaths(numBreaths);

    breathCounter = setInterval(() => {
      numBreaths--;
      displayBreaths(numBreaths);
      if (numBreaths <= 1) {
        clearInterval(breathCounter);
        success();
      }
    }, speed);
  });
}

function displayBreaths(numBreaths) {
  breathDiv.textContent = numBreaths;
}

async function countRounds(numRounds, numBreaths, speed) {
  for (let round = 1; round <= numRounds; round++) {
    roundNoDiv.textContent = round;
    await countBreaths(numBreaths, speed);
  }
}

// Retention timer
function timer() {
  let seconds = 0;
  displayTimer(seconds);

  startTiming = setInterval(() => {
    seconds++;
    displayTimer(seconds);
  }, 1000);
}

function displayTimer(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsInMinute = seconds % 60;
  console.log({ minutes, secondsInMinute });
}

// Stop retention timer
retentionBtn.addEventListener('click', timer);
stopBtn.addEventListener('click', () => {
  clearInterval(startTiming);
});