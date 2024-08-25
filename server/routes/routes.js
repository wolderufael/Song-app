const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const statisticsRouter = require("./statistics");
const Song = require("../models/song");
const User = require("../models/user");

const router = express.Router();
const secret = "song-app-wolderufael";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(201).json({ message: "User Already Exists" });
  }
  const user = new User({ username, password: hashedPassword });
  await user.save();
  return res.status(200).json({ message: "Succesfully registered" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      secret,
      { expiresIn: "1h" }
    );
    console.log("ID", user._id);
    return res.status(201).json({
      token: token,
      username: username,
      userId:user._id,
      message: "Logged in Succesfully",
    });
  } else {
    return res
      .status(401)
      .json({ message: "Username or Password is Invalid!" });
  }
});

router.post("/logout", async (req, res, next) => {
  return res.status(200).json({ message: "Logged out successfully" });
});

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1]; // Extract the token from the "Bearer <token>" string

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send("Unauthorized1");
      } else {
        req.userId = decoded.userId; // Attach the decoded userId to the request
        next();
      }
    });
  } else {
    res.status(401).send("Unauthorized2");
  }
};

router.get("/:username/Home", auth, async (req, res, next) => {
  try {
    const user = (await User.findById(req.userId).populate("songs")) || {};
    res.json(user.songs.reverse());
  } catch (err) {
    next(err);
  }
});

router.post("/:username/addsong", auth, async (req, res, next) => {
  try {
    const { title, artist, album, genre } = req.body;
    const user = await User.findById(req.userId);
     if (!user) {
       return res.status(404).json({ message: "User not found" });
     }


    const existingSong = await Song.findOne({
      title: new RegExp(`^\\s*${title.trim()}\\s*$`, "i"),
      artist: new RegExp(`^\\s*${artist.trim()}\\s*$`, "i"),
      album: new RegExp(`^\\s*${album.trim()}\\s*$`, "i"),
      genre: new RegExp(`^\\s*${genre.trim()}\\s*$`, "i"),
    });

    if (existingSong) {
      // Check if the existing song is already associated with the user
      const isSongAlreadyAdded = user.songs.includes(existingSong._id);

      if (isSongAlreadyAdded) {
        return res
          .status(400)
          .json({ message: "Song already Exists in user's list" });
      } else {
        // If the song exists but is not associated with the user, add it
        user.songs.push(existingSong._id);
        await user.save();
        return res
          .status(200)
          .json({ message: "Song Added Successfully!", song: existingSong });
      }
      }

    const newSong = new Song({
      title,
      artist,
      album,
      genre,
    });

    await newSong.save();

   
    user.songs.push(newSong._id);
    await user.save();

    res.status(200).json({ message: "Song Added Succesfully!", song: newSong });
  } catch (err) {
    next(err);
  }
});

router.put("/:username/:songid", auth, async (req, res, next) => {
  try {
    const songId = req.params.songid;
    const { title, artist, album, genre } = req.body;

    if (!title && !artist && !album && !genre) {
      return res
        .status(400)
        .json({ message: "At least one field is required to update" });
    }
    const updatedSong = await Song.findByIdAndUpdate(
      songId,
      { $set: { title, artist, album, genre } },
      { new: true, runValidators: true }
    );

    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res
      .status(200)
      .json({ message: "Song edited successfully", updatedsong: updatedSong ,updatedSongId:songId});
  } catch (err) {
    next(err);
  }
});

router.delete("/:username/:songid", auth, async (req, res, next) => {
  try {
    const songId = req.params.songid;

    // Validate that the song ID is provided
    if (!songId) {
      return res.status(400).json({ error: "Song ID is required" });
    }

    // Find and delete the song by ID
    const deletedSong = await Song.findByIdAndDelete(songId);

    // If no song is found, return a 404 error
    if (!deletedSong) {
      return res.status(404).json({ error: "Song not found" });
    }

    // Send a success response
    res
      .status(200)
      .json({ message: "Song deleted successfully", song: deletedSong });
  } catch (err) {
    next(err);
  }
});

router.use(statisticsRouter);

// module.exports = {router,auth};
// module.exports = auth;
module.exports = {
  router: router,
  auth: auth,
};
