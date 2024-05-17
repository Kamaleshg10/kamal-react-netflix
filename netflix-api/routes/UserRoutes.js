const { addToLikedMovies, getLikedMovies, removeFromlikedMovies } = require("../controllers/UserControls");

const router = require ("express").Router();

router.post("add",addToLikedMovies);
router.get("/liked/:email",getLikedMovies);
router.put("/delete",removeFromlikedMovies);

module.exports = router