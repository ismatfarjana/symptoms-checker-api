// CRUD operations
// const crypto = require('crypto');
const { connect } = require("../config/db.config");
const { User } = require("../models/users.model.js");

class UserRepository {
  constructor() {
    connect();
  }

  async getAllUsers() {
    const users = await User.find({});
    return users;
  }

  async getOneUser(id) {
    const users = await User.find({ _id: id });
    return users;
  }

  async updateUser(id, user) {
    try {
      await User.updateOne({ _id: id }, { $set: user });
    } catch {
      console.error("Error:" + err);
    }
    return user;
  }

  async deleteUser(userId) {
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
