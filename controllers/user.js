const userService = require("../services/user");

class UserController {
  async getAllUsers(req, res) {
    return await userService.getAllUsers().then((data) => res.json(data));
  }

  async getUser(req, res) {
    const { id } = req.params;
    return await userService.getUser(id).then((data) => res.json(data));
  }

  async updateUser(req, res) {
    const { name, gender, yearOfBirth } = req.body;
    const id = req.params.id;

    if (!name || !gender || !yearOfBirth) {
      return res.status(422).send({
        err: "Please supply name, gender and year of birth!",
      });
    }
    const userUpdate = {
      profile: {
        name: name,
        gender: gender,
        yearOfBirth: yearOfBirth,
      },
    };

    return await userService
      .updateUser(id, userUpdate)
      .then((data) => res.json(data));
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    return await userService.deleteUser(id).then((data) => res.json(data));
  }
}

module.exports = new UserController();
