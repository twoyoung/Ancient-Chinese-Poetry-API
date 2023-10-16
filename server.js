const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log('Connected to the database')).catch(err => console.log(err));

const app = express();

const port = process.env.PORT || 3000;




server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

