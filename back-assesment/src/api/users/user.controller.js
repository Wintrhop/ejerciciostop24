const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  //get all
  async signup(req, res) {
    try {
      const { email, password } = req.body;
      const encPassword = await bcrypt.hash(password, 8);

      const user = await User.create({ email, password: encPassword });

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
      const user = await User.findOne({ email });
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
      const user = await User.find();
      res.status(201).json({ message: "user found", data: user });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  /*
    //getID
    async show(req, res) {
      try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        //populates
        res.status(201).json({ message: 'user found', data: user });
      } catch (err) {
        res.status(400).json(err);
      }
    },
  
    // post
  
    async create(req, res) {
      try {
        const data = req.body;
  
        const user = await User.create(data);
  
        res.status(201).json({ message: 'User Created', data: user });
      } catch (err) {
        res.status(400).json({ message: 'User could not be created', data: err });
      }
    },
      */
  async update(req, res) {
    try {
      const data = req.body;
      const { userId } = req.userId;
      const user = await User.findByIdAndUpdate(userId, data, { new: true });
      res.status(200).json({ message: "User Updated", data: user });
    } catch (err) {
      res.status(400).json({ message: "User could not be Updated", data: err });
    }
  },

  async destroy(req, res) {
    try {
      const { userId } = req.userId;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User Deleted", data: user });
    } catch (error) {
      res.status(400).json({ Message: "User could not be Deleted", data: err });
    }
  },
};
