const {
    addToLikedMovies,
    getLikedMovies,
    removeFromLikedMovies,
    addUser
  } = require("../controllers/UserController");
  
  const router = require("express").Router();
  
  router.get("/liked/:email", getLikedMovies);
  router.post("/add", addToLikedMovies);
  router.put("/remove", removeFromLikedMovies);
  router.put('/addUser',addUser)
  module.exports = router;