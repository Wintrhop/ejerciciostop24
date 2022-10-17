const Users = require("./users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  //get all
  async signup(req, res) {
    try {
      const { email, password } = req.body;

      if (password.length<5){
        throw new Error('Password must have at least 5 characters')
      }
      const encPassword = await bcrypt.hash(password, 8);

      const user = await Users.create({ email, password: encPassword });

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });
      res
        .status(201)
        .json({ message: "user created successfully", data: { email, token } });
    } catch (err) {
      res
        .status(400)
        .json({ message: "user could not be created", error: err.message });
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      console.log(user);

      if (!user) {
        throw new Error("Email or password invalid");
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error("Email or password invalid");
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: 60 * 60 * 24,
      });

      res
        .status(201)
        .json({ message: "User Login Successfully", data: { email, token } });
    } catch (err) {
      res
        .status(400)
        .json({ message: "User could not login", data: err.message });
    }
  },

  async list(req, res) {
    try {
      const user = await Users.find().select('-_id');
      res.status(201).json({ message: "Users found", data: user });
    } catch (err) {
      res.status(400).json(err);
    }
  },
 
  async update(req, res) {
    try {
      const data = req.body;
      const userId = req.userId;
      const user = await Users.findByIdAndUpdate(userId, data, { new: true });
      res.status(200).json({ message: "User Updated", data: user });
    } catch (err) {
      res.status(400).json({ message: "User could not be Updated", data: err.message });
    }
  },

  async destroy(req, res) {
    try {
      const  userAuthId  = req.userId;
      console.log('auth user', userAuthId)
      const user = await Users.findById(userAuthId);

      if(!user){
        throw new Error('User not found');
      }
      
      const delUser = await Users.findByIdAndDelete(userAuthId);

    
      res.status(200).json({ message: "User Deleted", data: delUser });
    } catch (error) {
      res.status(400).json({ Message: "User could not be Deleted", data: error.message });
    }
  },
};
