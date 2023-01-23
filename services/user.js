// Define User service for Data manipulation
const userRepository = require("../repositories/user");

class UserService {
  constructor() {}

  async getAllUsers() {
    return await userRepository.getAllUsers();
  }

  async getUserById(id) {
    return await userRepository.getUserById(id);
  }

  async updateUserById(id, user) {
    return await userRepository.updateUserById(id, user);
  }
  async deleteUserById(userId) {
    return await userRepository.deleteUserById(userId);
  }
}

module.exports = new UserService();
