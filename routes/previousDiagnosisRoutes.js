const express = require("express");
const router = express.Router();

const {
  addDiagnosis,
  getAllDiagnosisByUserID,
} = require("../controllers/diagnosis");
const { authenticated } = require("../utils/global");

router.post("/", authenticated, addDiagnosis);
router.get("/", authenticated, getAllDiagnosisByUserID);

module.exports = router;
