const settings = document.getElementById('settings'),
  settingBtn = document.getElementById('settings-btn'),
  difficultySelect = document.getElementById('difficulty'),
  word = document.getElementById('word'),
  text = document.getElementById('text'),
  timeEl = document.getElementById('time'),
  scoreEl = document.getElementById('score'),
  endgameEl = document.getElementById('end-game-container');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in ls or medium
let difficulty = localStorage.getItem('difficulty') ?? 'medium';

// Set difficulty select value
difficultySelect.value = difficulty;

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function showWord() {
  randomWord = getRandomWord();
  word.innerText = `${randomWord}`;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerText = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

showWord();

// Event listeners

// Typing
text.addEventListener('input', e => {
  if (e.target.value === randomWord) {
    showWord();
    updateScore();

    // Clear
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings btn click
settingBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
difficultySelect.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
