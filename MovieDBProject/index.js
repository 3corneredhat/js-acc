// Bring in required packages
require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const fetch = require("node-fetch");
// Declare globals
const port = process.env.PORT || 5050;

// https://api.themoviedb.org/3/movie/now_playing
// details: https://api.themoviedb.org/3/movie/{movie_id}
const baseURL = "https://api.themoviedb.org/3/movie";

// Instantiate server
const app = express();
// Set the logger and server from the public folder
app.use(logger("dev"));
app.use(express.static("public"));

// Handle root route
app.get("/", (req, res) => {
  res.render("pages/landing.ejs");
});

const { TMDB_API_KEY } = process.env;

// Handle GET method from the form
app.get("/getresults", (req, res) => {
  fetch(`${baseURL}/now_playing?api_key=${TMDB_API_KEY}`)
    .then((response) => {
      if (response.ok) {
        // console.log(req);
        // Parse the response
        return response.json();
      } else {
        res.render("pages/error.ejs");
        throw Error("There was an error.");
      }
    })
    .then((data) => {
      // console.log(data.results);
      res.render("pages/results.ejs", { data: data.results });
    })
    .catch((err) => console.error("error:" + err));
});
app.get("/search", (req, res) => {
  let baseURL = `https://api.themoviedb.org/3/search`;
  let endpoint = `${baseURL}/movie?query=${req.query.search}&include_adult=false&language=en-US&page=1&api_key=${TMDB_API_KEY}`;

  fetch(endpoint)
    .then((response) => {
      if (response.ok) {
        // console.log(req);
        // Parse the response
        return response.json();
      } else {
        throw Error("There was an error.");
      }
    })
    .then((data) => {
      console.log(data.results);
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
