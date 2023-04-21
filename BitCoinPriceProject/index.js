let express = require("express");
let app = express();
let port = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/about", (req, res) => {
  res.render("pages/about");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
