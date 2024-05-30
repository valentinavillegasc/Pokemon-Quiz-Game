const resultElement = document.getElementById("result");
const pokemonImageElement = document.getElementById("pokemonImage");
const optionsContainer = document.getElementById("options");
const pointsElement = document.getElementById("pointsValue");
const totalCount = document.getElementById("totalCount");
const mainContainer = document.getElementById("container");
const LoadingContainer = document.getElementById("loadingContainer");

let usedPokemonIds = [];
let count = 0;

async function fetchPokemonById(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
}

//Function to load questio with options
async function loadQuestionWithOptions() {
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
}

function checkAnswer(isCorrect, event) {
  const selectedButton = document.querySelector(".selected");

  if (selectedButton) {
    return;
  } else {
    event.target.classList.add("selected");
    count++;
    totalCount.textContent = count;
  }
}

loadQuestionWithOptions();

function getRandomPokemonId() {
  return Math.floor(Math.random() * 151) + 1; //150
}

function shuffleArray(array) {
  return array.sort(() => {
    Math.random() - 0.5;
  });
}
