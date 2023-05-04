const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minLength: 6
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  next();

});



const Users = mongoose.model("users", userSchema);

module.exports = Users;
