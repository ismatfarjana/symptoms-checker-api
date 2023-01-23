// CRUD operations
const crypto = require("crypto");
const { connect } = require("../config/db.config");
const { User } = require("../models/user.js");

class UserRepository {
  constructor() {
    connect();
  }

  async findUserByEmail(email) {
    try {
      const user = await User.find({ email: email });
      return user[0];
    } catch (err) {
      return err;
    }
  }

  async createUser(userId, email, hash) {
    try {
      const user = await User.create({
        _id: userId,
        email,
        password: hash,
        profile: {},
      });
      return user[0];
    } catch (err) {
      return err;
    }
  }

  async getAllUsers() {
    const users = await User.find({});
    return users;
  }

  async getUserById(id) {
    const users = await User.find({ _id: id });
    return users;
  }

  async updateUserById(id, user) {
    try {
      await User.updateOne({ _id: id }, { $set: user });
    } catch {
      console.error("Error:" + err);
    }
    return user;
  }

  async deleteUserById(userId) {
    let data = {};
    try {
      data = await User.deleteOne({ _id: userId });
    } catch {
      console.error("Error:" + err);
    }
    return { status: `${data.deletedCount > 0 ? true : false}` };
  }
}

module.exports = new UserRepository();
