// Bring in required packages
const express = require("express");
const logger = require("morgan");
const fetch = require("node-fetch");
// Declare globals
const port = process.env.PORT || 5050;
const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
// Instantiate server
const app = express();
// Set the logger and server from the public folder
app.use(logger("dev"));
app.use(express.static("public"));

// Set up the body-parser to parse data
// that is received via POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle root route
app.get("/", (req, res) => {
  res.redirect("/home");
});

// Handle home route
app.get("/home", (req, res) => {
  res.render("pages/home.ejs");
});

// Handle result route
app.get("/result", (req, res) => {
  res.redirect("/home");
});

// Handle POST method from the form
app.post("/result", (req, res) => {
  // Call the API
  fetch(url)
    // Check the response
    .then((response) => {
      if (response.ok) {
        // Parse the response
        return response.json();
      } else {
        throw Error("There was an error.");
      }
    })
    // Do something with the data
    .then((data) => {
      //Check the body to determine what data to render
      if (req.body.currencyRadio === "USD") {
        res.render("pages/result.ejs", {
          data: `$${data.bpi.USD.rate_float.toFixed(2)}`,
        });
      } else if (req.body.currencyRadio === "GBP") {
        res.render("pages/result.ejs", {
          data: `£${data.bpi.GBP.rate_float.toFixed(2)}`,
        });
      } else if (req.body.currencyRadio === "EUR") {
        res.render("pages/result.ejs", {
          data: `€${data.bpi.EUR.rate_float.toFixed(2)}`,
        });
      } else {
        // redirect to home when nothing selected
        res.redirect("/home");
      }
    })
    .catch((err) => {
      console.log("Error - ", err);
    });
});

// handle the about route
app.get("/about", (req, res) => {
  res.render("about.ejs");
});

// Handle the port listener when the server is started
app.listen(port, () => console.log(`Server started on port ${port}`));
