const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const Poem = require("./models/poemModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ChinesePoetry", // Specify your desired database name here
  })
  .then(() => console.log("Connected to the database"))
  .catch((error) => console.log(error));

const folderPath = "/Users/yangyang/Desktop/chinese-poetry-master/曹操诗集";

fs.readdir(folderPath, (err, files) => {
  if (err) throw err;
  let insertedDocsCount = 0;
  files.forEach(async (file) => {
    if (path.extname(file) === ".json") {
      const filePath = path.join(folderPath, file);

      const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      fileData.forEach((poem) => delete poem.id);
      const insertedDocs = await Poem.insertMany(fileData);
      insertedDocsCount += insertedDocs.length;
      console.log("Inserted", insertedDocsCount, "documents successfully!");
    }
  });
});
