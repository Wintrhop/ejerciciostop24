const Users = require('../users/users.model');
const FavoriteList = require('./favoriteList.model');


module.exports = {
    //get all
    async list(req, res) {
      try {
        const userAuthId = req.userId;
        const userList= await Users.findById(userAuthId).select('-_id -password').populate({
          path: "favoriteList",
          select: "-user -email",
          });

          if(!userList){
            throw new Error('Favorites not found');
          }
        
        res.status(201).json({ message: "Favorites found", data: userList });
      } catch (err) {
        res.status(400).json(err.message);
      }
    },
    //getID
    async show(req, res) {
      try {
        const userAuthId = req.userId;
        const { favListId } = req.params;
        const {user} = await FavoriteList.findById(favListId);
          
                        
        if(!user){
          throw new Error('Favorites not found');
        }
        if (user._id.valueOf() !== userAuthId) {
          throw new Error("Invalid User");
        }
        const favList = await FavoriteList.findById(favListId)
          .populate({ path: "user", select: "-_id email" })
          
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
          user: userId,
        };
        const favList = await FavoriteList.create(newFavList);
        
        user.favoriteList.push(favList);
        await user.save({ validateBeforeSave: false });
  
        res.status(201).json({ message: "Favorites Created", data: favList });
      } catch (err) {
        res.status(400).json({ message: "Favorites could not be created", data: err.message });
      }
    },
    async createFav(req, res){
      try {
        const userAuthId = req.userId;
        const {favListId} = req.params;
        
        const data = req.body;
        const {user} = await FavoriteList.findById(favListId)
        
        if (!user) {
          throw new Error("Invalid list");
        }
        console.log('auth', userAuthId, 'user', user._id.valueOf());
        if (user._id.valueOf() !== userAuthId) {
          throw new Error("Invalid User");
        }
        const list = await FavoriteList.findById(favListId)
        list.favs.push(data);
        await list.save({ validateBeforeSave: false });
        res.status(201).json({ message: "Favorite Added", data: data });
      } catch (error) {
        res.status(400).json({ message: "Favorite could not be Added", data: error.message });
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
        let { user } = await FavoriteList.findById(favListId);
  
        if (user._id.valueOf() !== userAuthId) {
          throw new Error("Invalid User");
        }
        const userFav = await Users.findById(user);
        const newFavs = userFav.favoriteList.filter(item => favListId !== item.toString());
        userFav.favoriteList = newFavs;
        await userFav.save({validateBeforeSave: false});
        const favList = await FavoriteList.findByIdAndDelete(favListId);
        res.status(200).json({ message: "Favorites Deleted", data: favList });
      } catch (error) {
        res
          .status(400)
          .json({ Message: "Favorites could not be Deleted", data: error.message });
      }
    },
  };