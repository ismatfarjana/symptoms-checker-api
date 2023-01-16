const express = require("express");
const router = express.Router();
const { authenticated } = require("../utils/global");
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

router.get("/", authenticated, getAllUsers);
router.get("/:id", authenticated, getUser);
router.put("/:id", authenticated, updateUser);
router.delete("/:id", authenticated, deleteUser);

module.exports = router;
