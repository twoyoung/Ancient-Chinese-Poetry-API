const express = require("express");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const poetryController = require("./controllers/poetryController");

const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again an hour later.",
});

app.use("/", limiter);

app.use(compression());

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.route("/random").get(poetryController.getARandomPoemOrSong);
// app.route("/random").get(poetryController.getARandomPoemsByAuthor);
// app.route("/poem/:author").get(poetryController.getAllPoems);
// app.route("/poem/:dynasty").get(poetryController.getAllPoems);
app.route("/").get(poetryController.getAllPoemsAndSongs);
app.route("/poems").get(poetryController.getAllPoems);
app.route("/songs").get(poetryController.getAllSongs);
app.route("/authors").get(poetryController.getAllAuthors);

module.exports = app;
