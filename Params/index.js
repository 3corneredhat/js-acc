const express = require("express");
const app = express();
const logger = require("morgan");
const port = process.env.PORT || 8080;

app.use(logger("dev"));
app.get("/", (req, res) => res.redirect("/home"));
app.get("/home", (req, res) => res.send("Hello home page"));

app.get("/fruits", (req, res) => {
  res.send("I am the fruits page");
});
// '/:' is parameter that becomes a variable
app.get("/:fruits", (req, res) => {
  // req object with params property
  // params is an object with fruits as a key
  res.send(`I am the ${req.params.fruits} page`);
});

app.get("/fruits/:fuzzy", (req, res) => {
  res.send(`I am the ${req.params.fuzzy} page`);
});

app.get("/fruits/:fruits/eat/:love", (req, res) => {
  //   console.log(req.params);
  const { fruits, love } = req.params;
  res.send(`I ${love} ${fruits} page`);
});

// build a route that matches /name/:name/bank/:money
// send a message with name and dollar amount from money
// if money is less than 1 - "(name) Do you like living on the edge with {money} dollars?"
// if more than 100 "{name}, can I borrow {half of the money}?"
app.get("/name/:name/bank/:money", (req, res) => {
  const { name, money } = req.params;
  if (Number(money) < 100) {
    res.send(`${name} do you like living on the edge with ${money} dollars?`);
  }
  res.send(`${name}, can I borrow ${Number(money) / 2} dollars?`);
});

app.listen(port);
