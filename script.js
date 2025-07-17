let secretNumber = Math.floor(Math.random() * 100) + 1;

let attempts = 0;

const form = document.getElementById("game-form");
const input = document.getElementById("game-input");
const submitBtn = form.querySelector('button[type="submit"]');
const message = document.getElementById("message");
const count = document.getElementById("attempts");
const recordDisplay = document.getElementById("record");
const restartBtn = document.getElementById("restart-btn");

let record = localStorage.getItem("guessGameRecord");

if (record === null) {
  recordDisplay.textContent = "-";
} else {
  record = Number(record);
  const recordWord = declOfNum(record, ["спроба", "спроби", "спроб"]);
  recordDisplay.textContent = `${record} ${recordWord}`;
}

function declOfNum(number, words) {
  number = Math.abs(number) % 100;
  const n1 = number % 10;
  if (number > 10 && number < 20) return words[2];
  if (n1 > 1 && n1 < 5) return words[1];
  if (n1 === 1) return words[0];
  return words[2];
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const userGuess = Number(input.value);
  attempts++;

  const attemptsWord = declOfNum(attempts, ["спроба", "спроби", "спроб"]);

  message.textContent = `Ти ввів число ${userGuess}`;
  message.style.color = "";
  count.textContent = attempts;

  if (userGuess === secretNumber) {
    message.textContent = `Вітаю! Ви вгадали число ${secretNumber} за ${attempts} ${attemptsWord} 🎉!`;
    message.style.color = "#00eebeff";
    input.disabled = true;
    submitBtn.disabled = true;
    restartBtn.classList.add("show");

    confetti({
      particleCount: 200,
      spread: 120,
      startVelocity: 40,
      gravity: 0.6,
      ticks: 300,
      origin: { x: 0.5, y: 0.5 },
      colors: ["#00FFAA", "#FF0066", "#FFD700", "#00BFFF", "#FF4500"],
      shapes: ["circle", "square"],
      scalar: 1.2,
    });

    if (record === null || attempts < record) {
      record = attempts;
      localStorage.setItem("guessGameRecord", record);
      const recordWord = declOfNum(record, ["спроба", "спроби", "спроб"]);
      recordDisplay.textContent = `${record} ${recordWord}`;
    }
  } else if (userGuess < secretNumber) {
    message.textContent = "Занадто мало 🤗 Введіть більше число!";
    message.style.color = "yellow";
  } else {
    message.textContent = "Забагато 😅 Зменшіть число!";
    message.style.color = "yellow";
  }

  input.value = "";
  input.focus();
});

restartBtn.addEventListener("click", () => {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  count.textContent = attempts;
  message.textContent = "";
  message.style.color = "";
  input.disabled = false;
  submitBtn.disabled = false;
  input.value = "";
  input.focus();
  restartBtn.classList.remove("show");
});
