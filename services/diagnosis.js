// Define User service for Data manipulation
const diagnosisRepository = require("../repositories/diagnosis");
const crypto = require("crypto");

class UserService {
  constructor() {}

  async addDiagnosis(userId, symptoms, diagnosises) {
    const id = crypto.randomBytes(16).toString("hex");
    const diagnosisInsert = diagnosises.map((diagnosis) => {
      return {
        _id: id,
        issueId: diagnosis.Issue.ID,
        name: diagnosis.Issue.Name,
        profname: diagnosis.Issue.ProfName,
        accuracy: diagnosis.Issue.Accuracy,
        ranking: diagnosis.Issue.Ranking,
        cause: diagnosis.Issue.IcdName,
      };
    });

    const symptomsInsert = symptoms.map((symptom) => {
      return {
        symptomId: symptom.ID,
        name: symptom.Name,
      };
    });

    const diagnosisObject = {
      _id: id,
      userId: userId,
      issues: diagnosisInsert,
      selectedSymptoms: symptomsInsert,
    };
    return await diagnosisRepository.addDiagnosis(diagnosisObject);
  }

  async getAllDiagnosisByUserID(userId) {
    return await diagnosisRepository.getAllDiagnosisByUserID(userId);
  }

  async getIssuesListByDiagnosisID(id) {
    return await diagnosisRepository.getIssuesListByDiagnosisID(id);
  }

  async deleteDiagnosisByDiagnosisID(id) {
    // return await diagnosisRepository.deleteDiagnosisByDiagnosisID(id);
  }
}

module.exports = new UserService();
