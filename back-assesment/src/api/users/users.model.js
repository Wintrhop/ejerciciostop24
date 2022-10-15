const { Schema, model, models } = require("mongoose");
const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "You should enter a email"],
      match: [
        emailRegex,
        " You should enter a valid email example@example.com",
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
        required: [true, 'Debe ingresar una contraseña.'],
        minlength: [4, 'El password es muy corto'],
      },
  },
  { timestamps: true }
);
const Users = model("Users", UsersSchema);
module.exports = Users;
