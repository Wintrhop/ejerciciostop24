const Users = require('../users/users.model');
const FavoriteList = require('./favoriteList.model');


module.exports = {
    //get all
    async list(req, res) {
      try {
        const favsList = await FavoriteList.find()
          .populate({
            path: "user",
            select: "-_id email",
          })
          
        res.status(201).json({ message: "Favorites found", data: favsList });
      } catch (err) {
        res.status(400).json(err);
      }
    },
    //getID
    async show(req, res) {
      try {
        const { favListId } = req.params;
        const favList = await FavoriteList.findById(favListId)
          .populate({ path: "user", select: "-_id email" })
          .populate({ path: "favs", select: "-_id -user" });
          
        
        if(!favList){
          throw new Error('Favorites not found');
        }
        res.status(201).json({ message: "Favorites found", data: favList });
      } catch (error) {
        
        res.status(400).json({message: "error", data: error.message});
      }
    },
    // post
  
    async create(req, res) {
      try {
        const userId = req.userId;
        const data = req.body;
        const user = await Users.findById(userId);
  
        if (!user) {
          throw new Error("Invalid User");
        }
        const newFavList = {
          ...data,
          userId: userId,
        };
        const favList = await FavoriteList.create(newFavList);
        
        user.favoriteList.push(favList);
        await user.save({ validateBeforeSave: false });
  
        res.status(201).json({ message: "Favorites Created", data: favList });
      } catch (err) {
        res.status(400).json({ message: "Favorites could not be created", data: err.message });
      }
    },
    async update(req, res) {
      try {
        const userAuthId = req.userId;
        const data = req.body;
        const { favListId } = req.params;
        let { user } = await FavoriteList.findById(favListId);
  
        if (!user) {
          throw new Error("Invalid Favorites");
        }
  
        if (user._id.valueOf() !== userAuthId) {
          throw new Error("Invalid User");
        }
  
        const ListUpdate = await FavoriteList.findByIdAndUpdate(favListId, data, {
          new: true,
        });
        res.status(200).json({ message: "Favorites Updated", data: ListUpdate });
      } catch (error) {
        res
          .status(400)
          .json({ message: "Favorites could not be Updated", data: error.message });
      }
    },
    async destroy(req, res) {
      try {
        const userAuthId = req.userId;
        const { favListId } = req.params;
        let { user } = await Homes.findById(homeId);
  
        if (userId._id.valueOf() !== user) {
          throw new Error("Usuario invalido");
        }
        const userHom = await Users.findById(userId);
        const newHomes = userHom.homes.filter(item => homeId !== item.toString());
        userHom.homes = newHomes;
        await userHom.save({validateBeforeSave: false});
        const home = await Homes.findByIdAndDelete(homeId);
        res.status(200).json({ message: "Home Deleted", data: home });
      } catch (error) {
        res
          .status(400)
          .json({ Message: "Home could not be Deleted", data: error.message });
      }
    },
  };