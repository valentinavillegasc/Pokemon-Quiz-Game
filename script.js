const resultElement = document.getElementById("result");
const pokemonImageElement = document.getElementById("pokemonImage");
const optionsContainer = document.getElementById("options");
const pointsElement = document.getElementById("pointsValue");
const totalCount = document.getElementById("totalCount");
const mainContainer = document.getElementById("container");
const LoadingContainer = document.getElementById("loadingContainer");

async function fetchPokemonById(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
}

let usedPokemonIds = [];

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
    const randomOption = randomPokemon.nameoptions.push(randomOption);
  }
  console.log(options);
  console.log(optionsIds);
}

loadQuestionWithOptions();

function getRandomPokemonId() {
  return Math.floor(Math.random() * 151) + 1; //150
}
