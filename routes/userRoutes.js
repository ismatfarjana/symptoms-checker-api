const express = require("express");
const router = express.Router();
const { authenticated } = require("../utils/global");
const {
  getUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../utils/users");

router.get("/", authenticated, getUsers);
router.get("/:id", authenticated, getOneUser);
router.put("/:id", authenticated, updateUser);
router.delete("/:id", authenticated, deleteUser);

module.exports = router;
