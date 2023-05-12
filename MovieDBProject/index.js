// Bring in required packages
require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const fetch = require("node-fetch");

// Declare globals
const port = process.env.PORT || 5050;
const { TMDB_API_KEY } = process.env;

// Instantiate server
const app = express();
// Set the logger and server from the public folder
app.use(logger("dev"));
app.use(express.static("public"));

// Handle root route
app.get("/", (req, res) => {
  res.render("pages/landing.ejs");
});

// Handle GET method for movies now playing
app.get("/getresults", (req, res) => {
  let baseURL = "https://api.themoviedb.org/3/movie";
  fetch(`${baseURL}/now_playing?api_key=${TMDB_API_KEY}`)
    .then((response) => {
      if (response.ok) {
        // Parse the response
        return response.json();
      } else {
        res.render("pages/error.ejs");
        throw Error("There was an error.");
      }
    })
    .then((data) => {
      res.render("pages/results.ejs", { data: data.results });
    })
    .catch((err) => console.error("error:" + err));
});

// Handle GET method from the search form
app.get("/search", (req, res) => {
  let baseURL = `https://api.themoviedb.org/3/search`;
  let endpoint = `${baseURL}/movie?query=${req.query.search}&include_adult=false&language=en-US&page=1&api_key=${TMDB_API_KEY}`;

  fetch(endpoint)
    .then((response) => {
      if (response.ok) {
        // Parse the response
        return response.json();
      } else {
        throw Error("There was an error.");
      }
    })
    .then((data) => {
      //Conditionally render the results
      if (data.results.length === 0) {
        res.render("pages/error.ejs");
      }
      res.render("pages/results.ejs", { data: data.results });
    })
    .catch((err) => {
      console.error("error:" + err);
      res.render("pages/error.ejs");
    });
});
// handle the about route
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

// Handle the port listener when the server is started
app.listen(port, () => console.log(`Server started on port ${port}`));
