// Define User service for Data manipulation
const diagnosisRepository = require("../repositories/diagnosis");
const crypto = require("crypto");

class UserService {
  constructor() {}

  async addDiagnosis(userId, symptoms, diagnosises) {
    const id = crypto.randomBytes(16).toString("hex");

    diagnosises.map((diagnosis) => {
      diagnosis._id = crypto.randomBytes(16).toString("hex");
    });

    const diagnosisObject = {
      _id: id,
      userId: userId,
      diagnosis: diagnosises,
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
