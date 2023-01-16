// Define User service for Data manipulation
const userRepository = require("../repositories/user");

class UserService {
  constructor() {}

  async getAllUsers() {
    return await userRepository.getAllUsers();
  }

  async getUser(id) {
    return await userRepository.getUser(id);
  }

  async updateUser(id, user) {
    return await userRepository.updateUser(id, user);
  }
  async deleteUser(userId) {
    return await userRepository.deleteUser(userId);
  }
}

module.exports = new UserService();
