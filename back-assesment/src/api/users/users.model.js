const { Schema, model, models } = require("mongoose");
const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please Enter an Email"],
      match: [
        emailRegex,
        " You must enter a valid email example@example.com",
      ],
      validate: [
        {
          async validator(value) {
            try {
              const user = await models.Users.findOne({ email: value });
              return !user;
            } catch {
              return false;
            }
          },
          message: "User already exists",
        },
      ],
    },
    password: {
        type: String,
        required: [true, 'you should enter a password.'],
        minlength: [4, 'Password must have at least 4 characters'],
      },
    favoriteList:{
        type:[{type:Schema.Types.ObjectId, ref:'FavoriteList'}],
        required:false,
    }
  },
  { timestamps: true }
);
const Users = model("Users", UsersSchema);
module.exports = Users;
