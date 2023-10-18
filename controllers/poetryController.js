const Poem = require("../models/poemModel");
const Song = require("../models/songModel");
const Author = require("../models/authorModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getARandomPoemOrSong = async (req, res) => {
  const poemCount = await Poem.estimatedDocumentCount();
  const songCount = await Song.estimatedDocumentCount();
  const totalCount = poemCount + songCount;
  const randomNum = Math.floor(Math.random() * totalCount);
  let randomPoemOrSong;
  if (randomNum < poemCount) {
    const randomSkip = Math.floor(Math.random() * poemCount);
    randomPoemOrSong = await Poem.findOne().skip(randomSkip).select('-__v -_id');
  } else {
    const randomSkip = Math.floor(Math.random() * songCount);
    randomPoemOrSong = await Song.findOne().skip(randomSkip).select('-__v -_id');
  }

  res.status(200).json({
    status: "success",
    data: {
      randomPoemOrSong
    },
  });
};

exports.getAllPoemsAndSongs = async (req, res) => {
  let poemQuery = new APIFeatures(Poem.find(), req.query)
    .filter()
    .limitFields();

  let songQuery = new APIFeatures(Song.find(), req.query)
    .filter()
    .limitFields();

  const poemCount = await Poem.countDocuments(poemQuery.query);
  const songCount = await Song.countDocuments(songQuery.query);
  const totalCount = poemCount + songCount;

  const poemResults = new APIFeatures(poemQuery.query, req.query).paginate().query;
  const songResults = new APIFeatures(songQuery.query, req.query).paginate().query;
  // console.log(poemQuery);
  // console.log(songsQuery);

  const [poems, songs] = await Promise.all([
    poemResults.exec(),
    songResults.exec(),
  ]);
  // console.log('Poem Results:', results[0]);
  // console.log('Songs Results:', results[1]);

  const allPoemsAndSongs = [...poems, ...songs];
  // console.log(allPoemAndSongs.length);

  res.status(200).json({
    status: "success",
    results: totalCount,
    data: {
      allPoemsAndSongs,
    },
  });
};

exports.getAllPoems = async (req, res) => {
  const features = new APIFeatures(Poem.find(), req.query)
    .filter()
    .limitFields();
  const totalCount = await Poem.countDocuments(features.query);

  features.paginate();
  const finalData = await features.query;

  res.status(200).json({
    status: "success",
    results: totalCount,
    data: {
      finalData,
    },
  });
};

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
      finalData,
    },
  });
};

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
      finalData,
    },
  });
};
