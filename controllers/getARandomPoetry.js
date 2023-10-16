const Poetry = require('../models/poetryModel');

exports.getARandomPoetry = (req, res) => {
    const count = Poetry.estimatedDocumentCount();
    const random = Math.floor(Math.random() * count);
    const randomPoetry = Poetry.findOne().skip(random);
    res.status(200).json({
        status: 'success',
        data: {
            randomPoetry
        }
    })
}