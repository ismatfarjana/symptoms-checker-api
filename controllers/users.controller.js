const userService = require("../services/user.service");

class UserController {
  async getAllUsers() {
    return await userService.getAllUsers();
  }

  async getOneUser(id) {
    return await userService.getOneUser(id);
  }

  async createUser(user) {
    console.log("user in controller:", user);
    return await userService.createUser(user);
  }

  async updateUser(id, user) {
    return await userService.updateUser(id, user);
  }

  async deleteUser(userId) {
    return await userService.deleteUser(userId);
  }
}

module.exports = new UserController();
