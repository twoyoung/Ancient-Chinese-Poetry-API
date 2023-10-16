const express = require('express');
const Poetry = require('./models/poetryModel');
// const getARandomPoetry = require('./controllers/getARandomPoetry');
const getARandomPoetry = async (req, res) => {
    const count = await Poetry.countDocuments();
    
    const random = Math.floor(Math.random() * count);
    const randomPoetry = await Poetry.findOne().skip(random).exec();

    res.status(200).json({
        status: 'success',
        data: {
            randomPoetry
        }
    })
}

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.route('/random').get(getARandomPoetry);



module.exports = app;