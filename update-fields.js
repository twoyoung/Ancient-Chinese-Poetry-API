const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const Author = require('./models/authorModel');
const Poetry = require('./models/poetryModel');
const Song = require('./models/songModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);


mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ChinesePoetry' // Specify your desired database name here
  }).then(() => console.log('Connected to the database')).catch((error)=> console.log(error));

// const folderPath = '/Users/yangyang/Desktop/chinese-poetry-master/authors';

async function addFieldToExistingPoetry() {
    try {
        await Poetry.updateMany(
            {},  // Empty filter means "all documents"
            {
                $set: { "popularity": 0 }
            }
        );
        console.log("Field added successfully to all poetry");
    } catch (error) {
        console.error("Error updating poetry:", error);
    }
}

async function addFieldToExistingSong() {
    try {
        await Song.updateMany(
            {},  // Empty filter means "all documents"
            {
                $set: { "popularity": 0 }
            }
        );
        console.log("Field added successfully to all songs");
    } catch (error) {
        console.error("Error updating songs:", error);
    }
}

async function addFieldToExistingAuthor() {
    try {
        await Author.updateMany(
            {},  // Empty filter means "all documents"
            {
                $set: { "popularity": 0 }
            }
        );
        console.log("Field added successfully to all authors");
    } catch (error) {
        console.error("Error updating authors:", error);
    }
}


addFieldToExistingPoetry();
addFieldToExistingSong();
addFieldToExistingAuthor();


