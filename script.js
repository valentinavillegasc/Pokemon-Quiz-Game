const resultElement = document.getElementById("result");
const pokemonImageElement = document.getElementById("pokemonImage");
const optionsContainer = document.getElementById("options");
const pointsElement = document.getElementById("pointsValue");
const totalCountElement = document.getElementById("totalCount");
const mainContainer = document.getElementsByClassName("container")[0];
const loadingContainer = document.getElementById("loadingContainer");
const overContainer = document.querySelector(".over-container");
const startGameButton = document.getElementById("startGame");
const restartGameButton = document.getElementById("restartGame");
const finalPointsElement = document.getElementById("finalPointsValue");
const finalTotalCountElement = document.getElementById("finalTotalCount");
const frasesElement = document.getElementById("frases");
const backgroundMusic = document.getElementById("backgroundMusic");

let usedPokemonIds = [];
let count = 0;
let points = 0;
let showLoading = false;

async function fetchPokemonById(id) {
  showLoading = true;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
}

// Function to load question with options
async function loadQuestionWithOptions() {
  if (showLoading) {
    showLoadingWindow();
    hidePuzzleWindow();
  }
  let pokemonId = getRandomPokemonId();

  while (usedPokemonIds.includes(pokemonId)) {
    pokemonId = getRandomPokemonId();
  }

  usedPokemonIds.push(pokemonId);
  const pokemon = await fetchPokemonById(pokemonId);

  const options = [pokemon.name];
  const optionsIds = [pokemon.id];

  while (options.length < 4) {
    let randomPokemonId = getRandomPokemonId();
    while (optionsIds.includes(randomPokemonId)) {
      randomPokemonId = getRandomPokemonId();
    }
    optionsIds.push(randomPokemonId);
    const randomPokemon = await fetchPokemonById(randomPokemonId);
    const randomOption = randomPokemon.name;
    options.push(randomOption);

    if (options.length === 4) {
      showLoading = false;
    }
  }

  shuffleArray(options);

  resultElement.textContent = "Who's that pokemon?";
  pokemonImageElement.src = pokemon.sprites.other.dream_world.front_default;

  optionsContainer.innerHTML = "";
  options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = (event) => {
      checkAnswer(option === pokemon.name, event);
    };
    optionsContainer.appendChild(button);
  });

  if (!showLoading) {
    hideLoadingWindow();
    showPuzzleWindow();
  }
}

function checkAnswer(isCorrect, event) {
  const selectedButton = document.querySelector(".selected");

  if (selectedButton) {
    return;
  }
  event.target.classList.add("selected");
  count++;
  totalCountElement.textContent = count;

  if (isCorrect) {
    displayResult("Correct Answer");
    points++;
    pointsElement.textContent = points;
    event.target.classList.add("correct");
  } else {
    displayResult("Wrong answer...");
    event.target.classList.add("wrong");
  }

  if (count === 10) {
    endGame();
  } else {
    setTimeout(() => {
      showLoading = true;
      loadQuestionWithOptions();
    }, 1000);
  }
}

function endGame() {
  mainContainer.classList.add("hide");
  overContainer.classList.remove("hide");
  finalPointsElement.textContent = points;
  finalTotalCountElement.textContent = count;

  let message = "";

  if (points === 1) {
    message = "Congratulations!";
  } else if (points > 5 && points < 10) {
    const midRangeMessages = [
      "Good job!",
      "Well done!",
      "You did great!",
      "Nice effort!",
    ];
    message = getRandomMessage(midRangeMessages);
  } else if (points <= 5) {
    const lowRangeMessages = [
      "Better luck next time!",
      "Keep trying!",
      "Don't give up!",
      "You can do better!",
    ];
    message = getRandomMessage(lowRangeMessages);
  }

  frasesElement.textContent = message;
}

function getRandomMessage(messages) {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

restartGameButton.addEventListener("click", () => {
  count = 0;
  points = 0;
  usedPokemonIds = [];
  pointsElement.textContent = points;
  totalCountElement.textContent = count;
  overContainer.classList.add("hide");
  mainContainer.classList.remove("hide");
  loadQuestionWithOptions();
});

function getRandomPokemonId() {
  return Math.floor(Math.random() * 151) + 1; //150
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function displayResult(result) {
  resultElement.textContent = result;
}

function hideLoadingWindow() {
  loadingContainer.classList.add("hide");
}

function showLoadingWindow() {
  mainContainer.classList.remove("show");
  loadingContainer.classList.remove("hide");
  loadingContainer.classList.add("show");
}

function showPuzzleWindow() {
  loadingContainer.classList.remove("show");
  mainContainer.classList.remove("hide");
  mainContainer.classList.add("show");
}

function hidePuzzleWindow() {
  mainContainer.classList.add("hide");
}

/* Intro */
document.addEventListener("DOMContentLoaded", function () {
  const introContainer = document.querySelector(".intro-container");
  const gameContainer = document.querySelector(".game-container");

  // Show the intro container on page load
  introContainer.style.display = "block";

  startGameButton.addEventListener("click", function () {
    // Hide the intro container and show the game container
    introContainer.style.display = "none";
    gameContainer.style.display = "block";
    loadQuestionWithOptions();
  });
});

/*Background music */
const startButton = document.getElementById("startGame");
const restartButton = document.getElementById("restartGame");

startButton.addEventListener("click", function () {
  backgroundMusic.play();
});

restartButton.addEventListener("click", function () {
  backgroundMusic.currentTime = 0; // Reinicia la música
  backgroundMusic.play();
});
