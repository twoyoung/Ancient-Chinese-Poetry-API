const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const Poetry = require('./models/poetryModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);


mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ChinesePoetry' // Specify your desired database name here
  }).then(() => console.log('Connected to the database')).catch((error)=> console.log(error));

const folderPath = '/Users/yangyang/Desktop/chinese-poetry-master/quantangshi';

fs.readdir(folderPath, (err, files) => {
    if (err) throw err;
    let count = 0;
    files.forEach(async (file) => {
        if (path.extname(file) === '.json'){
            const filePath = path.join(folderPath, file);

            const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            fileData.forEach(poetry =>  delete poetry.id);
            await Poetry.insertMany(fileData);
            console.log('Data inserted successfully:', count, 'documents');

            
        }
    });
})

