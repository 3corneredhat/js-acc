var asciiHeart = require("ascii-heart");

console.log(asciiHeart());
console.log(
  asciiHeart(20, 20, {
    fill: "🌮",
    trim: false,
  })
);

console.log(
  asciiHeart(69, 69, {
    fill: "$",
  })
);
