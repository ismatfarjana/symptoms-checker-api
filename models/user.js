// Define schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    _id: { type: String, required: true },
    email: {
      type: String,
      unique: true,
    },
    password: String,
    profile: {
      name: { type: String },
      gender: { type: String },
      yearOfBirth: { type: String },
    },
  },
  {
    timestamps: {
      createDate: "created_at",
      updateDate: "updated_at",
    },
  }
);

const User = mongoose.model("users", UserSchema);

module.exports = {
  User,
};
