const User = require("../models/UserModels");

module.exports.addToLikeedMovies = async (req, res) => {
    try {
        const { email, data } = req.body;
        const user = await User.findOne({ email });
        if (User) {
            const { likedMovies } = user;
            const movieAlreadyLiked = likedMovies.find(({ id }) =>  id === data.id );
            if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(user._id, {
                    likedMovies: [...user, likedMovies, data],
                },{new: true}
            );
            }else return res.json({msg: "Movie Already to the liked list."})
        }else await User.create({email,likedMovies:[data]});
        return res.json({msg: "Movie Added Successfully"})
    } catch (err) {
        return res.json({ msg: "Error Adding Movie" });
    }
};

module.exports.getLikedMovies = async(req,res) => {
    try{
        const {email} = req.params; 
        const user  = await User.findOne({email})
        if(user) {
            res.json({msg:"sucess",movies:user.likedMovies})
        }else return res.json({msg:"User with given email not found"})
    }catch(err){
        return res.json({msg:"Error Fetching movie"})
    }
}

module.exports.removeFromlikedMovies = async(req,res) => {
    try{
        const { email, movieId } = req.body;
        const user = await User.findOne({ email });
        if (User) {
            const { likedMovies } = user;
            const  movieIndex  =  likedMovies.findIndex(({ id }) =>  id === movieId );
            if(!movieIndex) res.status(400).send({msg:"Movie not Found"})
                likedMovies.splice(movieIndex,1);
            // const movieAlreadyLiked = likedMovies.find(({ id }) =>  id === data.id );
            // if (!movieAlreadyLiked) {
                await User.findByIdAndUpdate(user._id, {
                    likedMovies,
                },{new: true}
            );
            // }
            return res.json({msg:"Movie Deleted", movies:likedMovies})
        }
    }catch(err) {
        return res.json({msg:"Error deleting Movie"})
    }
}