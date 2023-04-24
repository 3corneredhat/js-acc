const express = require("express");
const app = express();
const logger = require("morgan");
const port = process.env.PORT || 8080;

app.use(logger("dev"));
app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/home", (req, res) => {
  // object
  let animals = {
    dog: "woof",
    mouse: "squeak",
  };

  // first argument you want rendered
  // second arg = data
  // render and stop the request response cycle
  res.render("home.ejs", { data: animals });
  // if  {data: data}, ke and value are the same name
  // it can be declared {data}
});

// ejs is a templating engine that requires a 'views' directory
app.listen(port, () => console.log(`EJS demo lab on port ${port}`));
