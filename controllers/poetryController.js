const Poetry = require("../models/poetryModel");
const Song = require("../models/songModel");
const Author = require("../models/authorModel");
const APIFeatures = require("../utils/apiFeatures");


exports.getARandomPoetryOrSong = async (req, res) => {
  const poetryCount = await Poetry.estimatedDocumentCount();
  const songCount = await Song.estimatedDocumentCount();
  const totalCount = poetryCount + songCount;
  const randomNum = Math.floor(Math.random() * totalCount);
  let randomItem;
  if (randomNum < poetryCount){
    const randomSkip = Math.floor(Math.random() * poetryCount);
    randomItem = await Poetry.findOne().skip(randomSkip);
  } else {
    const randomSkip = Math.floor(Math.random() * songCount);
    randomItem = await Song.findOne().skip(randomSkip);
  }

  res.status(200).json({
    status: "success",
    data: {
      randomItem
    },
  });
};

exports.getAllPoetryAndSongs = async (req, res) => {
  const poetryCount = await Poetry.estimatedDocumentCount();
  const songCount = await Song.estimatedDocumentCount();
  const totalCount = poetryCount + songCount;

  const poetryQuery = new APIFeatures(Poetry.find(), req.query).filter().limitFields().paginate().query;
  const songsQuery = new APIFeatures(Song.find(), req.query).filter().limitFields().paginate().query;
  // console.log(poetryQuery);
  // console.log(songsQuery);

  const [poetry, songs] = await Promise.all([poetryQuery.exec(), songsQuery.exec()]);
  // console.log('Poetry Results:', results[0]);
  // console.log('Songs Results:', results[1]);

  const allPoetryAndSongs = [...poetry, ...songs];
  // console.log(allPoetryAndSongs.length);

  res.status(200).json({
    status: "success",
    results: totalCount,
    data: {
      allPoetryAndSongs
    },
  });
}

exports.getAllPoetry = async (req, res) => {
  const features = new APIFeatures(Poetry.find(), req.query)
      .filter()
      .limitFields();
  const totalCount = await Poetry.countDocuments(features.query);
    
  features.paginate();
  const finalData = await features.query;

  res.status(200).json({
    status: "success",
    results: totalCount,
    data: {
      finalData
    },
  });
}

exports.getAllSongs = async (req, res) => {
  const features = new APIFeatures(Song.find(), req.query)
      .filter()
      .limitFields();
  const totalCount = await Song.countDocuments(features.query);
  // console.log(totalCount);
  features.paginate();
  const finalData = await features.query;

  res.status(200).json({
    status: "success",
    results: totalCount,
    data: {
      finalData
    },
  });
}

exports.getAllAuthors = async (req, res) => {
  const features = new APIFeatures(Author.find(), req.query)
     .filter()
     .limitFields();
  const totalCount = await Author.countDocuments(features.query);
  // console.log(totalCount);
  features.paginate();
  const finalData = await features.query;

  res.status(200).json({
    status: "success",
    results: totalCount,
    data: {
      finalData
    },
  });
}


