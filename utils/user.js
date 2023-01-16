const userController = require("../controllers/user");

const getUsers = async (req, res) => {
  await userController.getAllUsers().then((data) => res.json(data));
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  await userController.getOneUser(id).then((data) => res.json(data));
};

const updateUser = async (req, res) => {
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

  await userController
    .updateUser(id, userUpdate)
    .then((data) => res.json(data));
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await userController.deleteUser(id).then((data) => res.json(data));
};

module.exports = {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
};
