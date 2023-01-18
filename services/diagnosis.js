// Define User service for Data manipulation
const diagnosisRepository = require("../repositories/diagnosis");
const crypto = require("crypto");

class UserService {
  constructor() {}

  async addDiagnosis(userId, symptoms, diagnosises) {
    const id = crypto.randomBytes(16).toString("hex");
    const updatedDiagnosis = diagnosises.map((diagnosis) => {
      return {
        _id: id,
        name: diagnosis.Issue.ProfName,
        accuracy: diagnosis.Issue.Accuracy,
        ranking: diagnosis.Issue.Ranking,
      };
    });

    const diagnosisObject = {
      _id: id,
      userId: userId,
      diagnosis: updatedDiagnosis,
      selectedSymptoms: symptoms,
    };

    return await diagnosisRepository.addDiagnosis(diagnosisObject);
  }

  async getAllDiagnosisesByUserId(userId) {
    // return await diagnosisRepository.getAllUsers();
  }

  async getOneDiagnosisByUserId(id) {
    // return await diagnosisRepository.getUserById(id);
  }

  async deleteDiagnosis(userId) {
    // return await diagnosisRepository.deleteUser(userId);
  }
}

module.exports = new UserService();
