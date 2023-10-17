const Poetry = require("../models/poetryModel");
const Song = require("../models/songModel");
const Author = require("../models/authorModel");
const APIFeatures = require("../utils/apiFeatures");


exports.getARandomPoetryOrSong = async (req, res) => {
  const poetryCount = await Poetry.estimatedDocumentCount();
  const songCount = await Song.estimatedDocumentCount();
  const totalCount = poetryCount + songCount;
  const randomNum = Math.floor(Math.random() * totalCount);
  console.log(randomNum);
  console.log(poetryCount);
  console.log(songCount);
  let randomItem;
  if (randomNum < poetryCount){
    const randomSkip = Math.floor(Math.random() * poetryCount);
    randomItem = await Poetry.findOne().skip(randomSkip);
  } else {
    const randomSkip = Math.floor(Math.random() * songCount);
    randomItem = await Song.findOne().skip(randomSkip);
  }
  // const versesCount = randomTangshi.paragraphs.length;
  // const randomVerse = randomTangshi.paragraphs[Math.floor(Math.random() * versesCount)];

  res.status(200).json({
    status: "success",
    data: {
      randomItem
    },
  });
};

exports.getAllPoetryAndSongs = async (req, res) => {
  const poetryQuery = new APIFeatures(Poetry.find(), req.query).filter().limitFields().query;
  const songsQuery = new APIFeatures(Song.find(), req.query).filter().limitFields().query;
  // console.log(poetryQuery);
  // console.log(songsQuery);

  const [poetry, songs] = await Promise.all([poetryQuery.exec(), songsQuery.exec()]);
  // console.log('Poetry Results:', results[0]);
  // console.log('Songs Results:', results[1]);

  const allPoetryAndSongs = [...poetry, ...songs];

  const finalData = new APIFeatures(allPoetryAndSongs, req.query).paginate().query;
  console.log(allPoetryAndSongs.length);

  res.status(200).json({
    status: "success",
    results: allPoetryAndSongs.length,
    data: {
      finalData
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
  console.log(totalCount);
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
  console.log(totalCount);
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


// exports.getARandomPoetryByAuthor = async (req, res) => {
//   const author = req.params.author;
//   const count = await Poetry.estimatedDocumentCount({author: author});
//   if (count === 0){
//     return res.status(404).json({
//       status: 'not_found',
//       message: `No poetry found for author: ${author}`
//     });
//   }
//   const randomSkip = Math.floor(Math.random() * count);
//   const randomPoetry = await Poetry.findOne({author: author}).skip(randomSkip);

//   res.status(200).json({
//     status: "success",
//     data: {
//       randomPoetry
//     },
//   });
// }

