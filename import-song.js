const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const Song = require('./models/songModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);


mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ChinesePoetry' // Specify your desired database name here
  }).then(() => console.log('Connected to the database')).catch((error)=> console.log(error));

const folderPath = '/Users/yangyang/Desktop/chinese-poetry-master/纳兰性德';

fs.readdir(folderPath, (err, files) => {
    if (err) throw err;
    let insertedDocsCount = 0;
    files.forEach(async (file) => {
        if (path.extname(file) === '.json'){
            const filePath = path.join(folderPath, file);

            const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            // const mappedData = fileData.map(song => {
            //     const { para, ...rest } = song;
            //     return { paragraph: para, ...rest };
            // });

            // const dataWithRhythmic = fileData.map(song => {
            //     song.paragraph = song.para;
            //     const titleParts = song.title.split('·');
            //     if (titleParts.length > 0) {
            //         song.rhythmic = titleParts[0].trim();
            //     }
            //     return song;
            // });

            fileData.forEach(song => song.description = poetry.desc);

            dataWithRhythmic.forEach(poetry =>  delete poetry.id);
            dataWithRhythmic.forEach(poetry =>  delete poetry.para);
            const insertedDocs = await Song.insertMany(dataWithRhythmic);
            insertedDocsCount += insertedDocs.length;
            console.log('Inserted', insertedDocsCount, 'documents successfully!');   
        }
    });   
})