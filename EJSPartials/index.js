const express = require("express");
const logger = require("morgan");
const port = process.env.PORT || 8080;
const app = express();

app.use(logger("dev"));

app.use(express.static("public"));

// body-parser is used to parse data
// that is received via POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  //   res.send("This is the home route.");
  res.render("home.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/postdata", (req, res) => {
  console.log(req.body.lName);
  res.send("I received the data");
});

app.listen(port, () => {
  console.log(`Listening of port ${port}`);
});
