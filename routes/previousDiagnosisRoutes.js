const express = require("express");
const router = express.Router();

const {
  addDiagnosis,
  getAllDiagnosisByUserID,
  getOneDiagnosisByID,
} = require("../controllers/diagnosis");
const { authenticated } = require("../utils/global");

router.post("/", authenticated, addDiagnosis);
router.get("/", authenticated, getAllDiagnosisByUserID);
router.get("/:id", authenticated, getOneDiagnosisByID);

module.exports = router;
