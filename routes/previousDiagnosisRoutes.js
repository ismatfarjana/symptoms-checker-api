const express = require("express");
const router = express.Router();

const {
  addDiagnosis,
  getAllDiagnosisByUserID,
  getIssuesListByDiagnosisID,
} = require("../controllers/diagnosis");
const { authenticated } = require("../utils/global");

router.post("/", authenticated, addDiagnosis);
router.get("/", authenticated, getAllDiagnosisByUserID);
router.get("/:id", authenticated, getIssuesListByDiagnosisID);

module.exports = router;
