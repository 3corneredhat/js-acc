let express = require("express");
let logger = require("morgan");
let app = express();
let port = process.env.PORT || 8080;

const fetch = require("node-fetch");

let url = "https://api.coindesk.com/v1/bpi/currentprice.json";

let settings = { method: "Get" };

fetch(url, settings).then((res) =>
  res.json().then((json) => {
    console.log(json["bpi"]["USD"]);
  })
);

app.use(logger("dev"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("pages/home.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
