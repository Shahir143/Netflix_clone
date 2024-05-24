const User = require("../models/UserModel");

exports.addUser = async (req, res) => {
  try {
    const { email } = req.body; // Extract email from request body

    // Create a new user instance
    const newUser = new User({
      email: email,
      // You can add more properties here if needed
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Send the saved user as a JSON response
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' }); // Send an error response
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
};

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else return res.json({ msg: "Movie already added to the liked list." });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ msg: "Movie successfully added to liked list." });
  } catch (error) {
    return res.json({ msg: "Error adding movie to the liked list" });
  }
};

module.exports.removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex(({ id }) => id === movieId);
      if (!movieIndex) {
        res.status(400).send({ msg: "Movie not found." });
      }
      movies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: movies,
        },
        { new: true }
      );
      return res.json({ msg: "Movie successfully removed.", movies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error removing movie to the liked list" });
  }
};