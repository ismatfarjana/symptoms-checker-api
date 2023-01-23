const express = require("express");
const router = express.Router();
const { authenticated } = require("../utils/global");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user");

router.get("/", authenticated, getAllUsers);
router.get("/:id", authenticated, getUserById);
router.put("/:id", authenticated, updateUserById);
router.delete("/:id", authenticated, deleteUserById);

module.exports = router;
