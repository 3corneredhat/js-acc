// 1. Foundation
// import required packages
const pokemon = require("pokemon");
const express = require("express");

// initialize express instance
const app = express();
// set the port for the server
const port = process.env.PORT || 8080;

// 2. Route Handlers
// set the root route
app.get("/", (req, res) => res.send("I am the Pokemon root route."));
// set the pokemon route
app.get("/pokemon", (req, res) => res.send(`${pokemon.random()}`));

// function that returns an array of 5 random pokemon
// @ret arr - an array of strings
function generateFivePokemon() {
  const ATK_MIN = 50;
  const ATK_MAX = 100;
  const DEF_MAX = 100;
  const DEF_MIN = 0;

  let arr = [];
  let pName;
  let count = 0;
  // add 5 random pokemon to an array
  while (count < 5) {
    pName = pokemon.random();
    // if the pokemon is not in the dex array, add it.
    // filter each object in the array by checking its
    // name and returning an array of objects that
    // match the name.
    if (arr.filter((e) => e.pokemon === pName).length === 0) {
      tempPokemon = {
        pokemon: pName,
        // generate a random number and take the floor to get
        // an integer.
        atk: Math.floor(Math.random() * (ATK_MAX - ATK_MIN) + ATK_MIN),
        def: Math.floor(Math.random() * (DEF_MAX - DEF_MIN) + DEF_MIN),
      };
      arr.push(tempPokemon);
      count++;
    }
    // otherwise, try another random pokemon
  }
  return arr;
}
// set the dex route
app.get("/dex", (req, res) =>
  // use stringify method to convert objects to strings.
  res.send(`${JSON.stringify(generateFivePokemon(), null, "\t")}`)
);
// The battleHandler function simulates a battle between two
// pokemon and returns a message of the outcome.
// @ret a string description of the outcome.
function battleHandler() {
  // generate five random pokemon
  let pokemon = generateFivePokemon();
  // use the first two pokemon for the battle
  // when the first pokemon has a greater attack than defense
  // of the second
  if (pokemon[0].atk > pokemon[1].def) {
    return `And the winner is ${pokemon[0]["pokemon"]} with an attack of ${pokemon[0].atk} and a defense of ${pokemon[0].def} versus ${pokemon[1]["pokemon"]} who has an attack of ${pokemon[1].atk} and a defense of ${pokemon[1].def}`;
  } // when the second pokemon has a greater attack than defense
  // of the first
  else if (pokemon[1].atk > pokemon[0].def) {
    return `And the winner is  ${pokemon[1]["pokemon"]} had an attack of ${pokemon[1].atk} and a defense of ${pokemon[1].def} versus ${pokemon[0]["pokemon"]} who has an attack of ${pokemon[0].atk} and a defense of ${pokemon[0].def}`;
  }
  // when neither of the cases is true, then there is a tie
  return `There is a tie! ${pokemon[0]["pokemon"]} had an attack of ${pokemon[0].atk} and a defense of ${pokemon[0].def} versus ${pokemon[1]["pokemon"]} who has an attack of ${pokemon[1].atk} and a defense of ${pokemon[1].def}`;
}
app.get("/battle", (req, res) => res.send(`${battleHandler()}`));

// 3. listeners
app.listen(port, () => console.log(`Pokemon Server on port ${port}`));
