
// const express = require("express");
// const router = express.Router();
// const Song = require("../models/song");

// router.get("/statistics", async (req, res, next) => {
//   // console.log("Stat is implemented");
//   try {
//     const stats = await Song.aggregate([
//       {
//         $facet: {
//           songCount: [
//             {
//               $group: {
//                 _id: {
//                   title: "$title",
//                   artist: "$artist",
//                   album: "$album",
//                   genre: "$genre",
//                 },
//               },
//             },
//             { $count: "totalSongs" },
//           ],
//           artistCount: [
//             { $group: { _id: "$artist" } },
//             { $count: "totalArtists" },
//           ],
//           albumCount: [
//             { $group: { _id: "$album" } },
//             { $count: "totalAlbums" },
//           ],
//           genreCount: [
//             { $group: { _id: "$genre" } },
//             { $count: "totalGenres" },
//           ],
//           songsPerArtist: [{ $group: { _id: "$artist", count: { $sum: 1 } } }],
//           songsPerAlbum: [{ $group: { _id: "$album", count: { $sum: 1 } } }],
//           songsPerGenre: [{ $group: { _id: "$genre", count: { $sum: 1 } } }],
//         },
//       },
//     ]);



//     res.status(200).json({
//       songCount: stats[0].songCount[0]?.totalSongs || 0,
//       artistCount: stats[0].artistCount[0]?.totalArtists || 0,
//       genreCount: stats[0].genreCount[0]?.totalGenres || 0,
//       albumCount: stats[0].albumCount[0]?.totalAlbums || 0,
//       songsPerArtist: stats[0].songsPerArtist,
//       songsPerAlbum:stats[0].songsPerAlbum,
//       songsPerGenre:stats[0].songsPerGenre
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;

// const { auth }=require( "./routes");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const { auth} = require("./routes");
console.log("auth: ", auth);

// const auth = (req, res, next) => {
//   const authHeader = req.headers["authorization"];

//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     const token = authHeader.split(" ")[1]; // Extract the token from the "Bearer <token>" string

//     jwt.verify(token, secret, (err, decoded) => {
//       if (err) {
//         return res.status(401).send("Unauthorized1");
//       } else {
//         req.userId = decoded.userId; // Attach the decoded userId to the request
//         next();
//       }
//     });
//   } else {
//     res.status(401).send("Unauthorized2");
//   }
// };

router.get("/statistics/:userId", async (req, res, next) => {
  console.log("Stat is implemented");
  try {
    const userId = req.params.userId;

    const stats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } }, // Match the specific user by their ID
      { $unwind: "$songs" }, // Unwind the songs array to work with each song individually
      {
        $lookup: {
          from: "songs", // Collection name in MongoDB
          localField: "songs",
          foreignField: "_id",
          as: "songDetails",
        },
      },
      { $unwind: "$songDetails" }, // Unwind the songDetails array
      {
        $facet: {
          songCount: [
            {
              $group: {
                _id: null,
                totalSongs: { $sum: 1 },
              },
            },
          ],
          artistCount: [
            { $group: { _id: "$songDetails.artist" } },
            { $count: "totalArtists" },
          ],
          albumCount: [
            { $group: { _id: "$songDetails.album" } },
            { $count: "totalAlbums" },
          ],
          genreCount: [
            { $group: { _id: "$songDetails.genre" } },
            { $count: "totalGenres" },
          ],
          songsPerArtist: [
            { $group: { _id: "$songDetails.artist", count: { $sum: 1 } } },
          ],
          songsPerAlbum: [
            { $group: { _id: "$songDetails.album", count: { $sum: 1 } } },
          ],
          songsPerGenre: [
            { $group: { _id: "$songDetails.genre", count: { $sum: 1 } } },
          ],
        },
      },
    ]);

    res.status(200).json({
      songCount: stats[0].songCount[0]?.totalSongs || 0,
      artistCount: stats[0].artistCount[0]?.totalArtists || 0,
      albumCount: stats[0].albumCount[0]?.totalAlbums || 0,
      genreCount: stats[0].genreCount[0]?.totalGenres || 0,
      songsPerArtist: stats[0].songsPerArtist,
      songsPerAlbum: stats[0].songsPerAlbum,
      songsPerGenre: stats[0].songsPerGenre,
    });
  } catch (err) {
    next(err);
    // console.log("stat eror : ", err);
  }
});

module.exports = router;
