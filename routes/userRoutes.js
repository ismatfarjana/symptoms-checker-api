const express = require("express");
const router = express.Router();
const { authenticated } = require("../utils/global");
const {
  getUsers,
  getOneUser,
  // createUser,
  updateUser,
  deleteUser,
} = require("../utils/users");

router.get("/", authenticated, getUsers);
router.get("/:id", getOneUser);
// router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
