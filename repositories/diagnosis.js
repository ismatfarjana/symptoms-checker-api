// CRUD operations
const { connect } = require("../config/db.config");
const { Diagnosis } = require("../models/diagnosis.js");

class DiagnosisRepository {
  constructor() {
    connect();
  }

  async addDiagnosis(diagnosisObject) {
    try {
      const newDiagnosis = await Diagnosis.create(diagnosisObject);
      return newDiagnosis;
    } catch (err) {
      return err;
    }
  }

  async getAllDiagnosisByUserID(userId) {
    try {
      const allDiagnosis = await Diagnosis.find({ userId: userId });

      return allDiagnosis;
    } catch (err) {
      return err;
    }
  }
}

module.exports = new DiagnosisRepository();