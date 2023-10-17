const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env'});

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ChinesePoetry' // Specify your desired database name here
  }).then(() => console.log('Connected to the database')).catch(err => console.log(err));


const port = process.env.PORT || 8000;


server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

