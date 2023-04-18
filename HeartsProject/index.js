// Bring in the dependency
var asciiHeart = require("ascii-heart");

// Print the heart with the default options
console.log(asciiHeart());

// Print a heart with the specified for the
// height, width, a desired and trimming set to off.
console.log(
  asciiHeart(20, 20, {
    fill: "🌮",
    trim: false,
  })
);

// Print another heart with the specified options
console.log(
  asciiHeart(69, 69, {
    fill: "$",
  })
);
