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

  async updateUser(id, user) {
    return await userRepository.updateUser(id, user);
  }
  async deleteUser(userId) {
    return await userRepository.deleteUser(userId);
  }
}

module.exports = new UserService();
