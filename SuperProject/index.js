// Bring in the dependency
var marvel = require("marvel-characters");
// Store the random character
let randomMarvelCharacter = marvel();
// Log the random character
console.log(randomMarvelCharacter);
// marvel.characters returns an array
let allMarvelCharacters = marvel.characters;
// Log the number of characters in the database
console.log(
  `The number of characters in the database: ${allMarvelCharacters.length}`
);

// Filter the database for characters that start with "Man"
let searchResult = allMarvelCharacters.filter((char) => char.match("^Man"));
displaySearchResult(searchResult);
// Filter the database for characters that contain "Iron Man"
searchResult = allMarvelCharacters.filter((char) => char.match("Iron Man"));
displaySearchResult(searchResult);
// Filter the database for characters that contain "Batman"
searchResult = allMarvelCharacters.filter((char) => char.match("Batman"));
displaySearchResult(searchResult);
// Void helper function to display the search result
// @param arr - the array of characters to display
function displaySearchResult(arr) {
  if (arr.length === 0) console.log("No matches found");
  for (let char of arr) console.log(char);
}
