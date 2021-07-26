'use strict';

const breaths = document.querySelector('#numBreaths');
const rounds = document.querySelector('#numRounds');
const paceSelect = document.querySelector('#breathingPace');
const options = document.querySelector('.options');
const secondaryBtns = document.querySelector('.secondaryBtns');
const roundInfo = document.querySelector('.roundInfo');
const breathCounter = document.querySelector('.breathCounter');
let speed;

const roundNo = document.querySelector('.roundNo');
const totalRounds = document.querySelector('.totalRounds');

const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

startBtn.addEventListener('click', () => {
  let numBreaths = parseInt(breaths.value);
  let numRounds = parseInt(rounds.value);
  let pace = paceSelect.value;
  totalRounds.textContent = numRounds;

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
    speed = 500;
  }

  // Start counting
  startCounting(numRounds, numBreaths);
});

async function startCounting(numRounds, numBreaths) {
  console.log({ numRounds });
  for (let round = 1; round <= numRounds; round++) {
    console.log({ round });
    roundNo.textContent = round;
    await countUp(numBreaths);
  }
}

function countUp(numBreaths) {
  let breathNo = 1;
  return new Promise((resolve) => {
    const countingUp = setInterval(() => {
      breathCounter.textContent = breathNo;
      if (breathNo == numBreaths + 1) {
        clearInterval(countingUp);
        breathCounter.textContent = '--';
      }
      breathNo++;
      resolve();
    }, speed);
  });
}




//===================
 // Start counting



// NOT WORKING
// let round = 1;
// while (round <= numRounds) {
//   console.log({ numRounds });
//   console.log({ round });
//   let breathNo = 1;
//   const countingUp = setInterval(() => {
//     roundNo.textContent = round;
//     breathCounter.textContent = breathNo;
//     if (breathNo == numBreaths + 1) {
//       breathNo = 0;
//     }
//     breathNo++;
//     clearInterval(countingUp);
//   }, speed);
//   round++;
// }
// breathCounter.textContent = '--';