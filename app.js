if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const https = require("https");
const fetch = require("node-fetch");
const cuisines = require("./cuisineData");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const apiKey = "apiKey=" + process.env.API_KEY;

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.post("/search", (req, res) => {
  const { query, ingredients, calories, cuisine } = req.body;
  let url = `/results?query=${query}`;
  if (ingredients) {
    url += `&ingredients=${ingredients}`;
  }
  if (calories != 1250) {
    url += `&calories=${calories}`;
  }
  if (cuisine != "nopref") {
    url += `&cuisine=${cuisine}`;
  }
  res.redirect(url);
});

app.get("/results", (req, res) => {
  const { query, ingredients, calories, cuisine } = req.query;
  let url =
    "https://api.spoonacular.com/recipes/complexSearch?" +
    apiKey +
    "&query=" +
    query;
  if (ingredients) {
    url += `&includeIngredients=${ingredients}`;
  }
  if (calories) {
    url += `&maxCalories=${calories}`;
  }
  if (cuisine) {
    url += `&cuisine=${cuisine}`;
  }
  url += "&addRecipeInformation=true&addRecipeNutrition=true&number=30";
  fetch(url)
    .then((res) => res.json())
    .then((data) => res.render("results", { results: data.results }));
});

app.get("/random", (req, res) => {
  const url = "https://api.spoonacular.com/recipes/random?" + apiKey;
  fetch(url)
    .then((res) => res.json())
    .then((data) => res.redirect(`/dish/${data.recipes[0].id}`));
});

app.get("/dish/:dishId", (req, res) => {
  const url = `https://api.spoonacular.com/recipes/informationBulk?ids=${req.params.dishId}&${apiKey}&includeNutrition=true`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => res.render("dish", { dish: data[0] }));
});

app.listen(3000, () => {
  console.log("Server is up and running on Port 3000");
});
