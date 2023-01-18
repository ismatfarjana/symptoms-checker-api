const express = require("express");
const router = express.Router();
const {
  getSymptoms,
  getIssues,
  getOneIssue,
  getDiagnosis,
  getSpecialisations,
  getProposedSymptoms,
  getBodyLocations,
  getOneLocation,
  getBodySymptoms,
} = require("../controllers/apimedic");
const { addDiagnosis } = require("../controllers/diagnosis");
const { authenticated } = require("../utils/global");

router.get("/symptoms", getSymptoms);
router.get("/issues", getIssues);
router.get("/issues/:id", getOneIssue); // required: id
router.get("/diagnosis", getDiagnosis); // required: symptoms ids, gender, year of birth
router.get("/diagnosis/specialisations", getSpecialisations); // required: symptoms ids, gender, year of birth
router.get("/symptoms/proposed", getProposedSymptoms); // required: symptoms ids, gender, year of birth
router.get("/locations", getBodyLocations);
router.get("/locations/:id", getOneLocation); // required: id
router.get("/body/symptoms", getBodySymptoms); // required: location id, gender

router.post("/diagnosis", authenticated, addDiagnosis);

module.exports = router;
