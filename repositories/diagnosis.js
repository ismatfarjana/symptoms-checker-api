// CRUD operations
const { Diagnosis } = require("../models/diagnosis.js");

class DiagnosisRepository {
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
      const aggregateArray = [
        { $match: { userId: userId } },
        {
          $project: {
            _id: 1,
            selectedSymptoms: 1,
            createdAt: 1,
          },
        },
      ];

      const allDiagnosis = await Diagnosis.aggregate(aggregateArray);
      return allDiagnosis;
    } catch (err) {
      return err;
    }
  }

  async getIssuesListByDiagnosisID(id) {
    try {
      const aggregateArray = [
        { $match: { _id: id } },
        {
          $project: {
            _id: 1,
            diagnosis: 1,
          },
        },
      ];
      const diagnosis = await Diagnosis.aggregate(aggregateArray);

      return diagnosis;
    } catch (err) {
      return err;
    }
  }
}

module.exports = new DiagnosisRepository();
