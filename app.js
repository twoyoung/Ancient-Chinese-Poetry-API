const express = require("express");
const Poetry = require("./models/poetryModel");
const song = require("./models/songModel");
const poetryController = require("./controllers/poetryController");

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.route("/random").get(poetryController.getARandomPoetryOrSong);
// app.route("/random").get(poetryController.getARandomPoetryByAuthor);
// app.route("/poetry/:author").get(poetryController.getAllPoetry);
// app.route("/poetry/:dynasty").get(poetryController.getAllPoetry);
app.route("/").get(poetryController.getAllPoetryAndSongs);
app.route("/poetry").get(poetryController.getAllPoetry);
app.route("/songs").get(poetryController.getAllSongs);
app.route("/authors").get(poetryController.getAllAuthors);

module.exports = app;
