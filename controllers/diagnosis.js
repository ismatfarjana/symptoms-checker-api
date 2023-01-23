const diagnosisService = require("../services/diagnosis");

class DiagnosisController {
  async addDiagnosis(req, res) {
    const { symptoms, diagnosis } = req.body;
    const userId = req.user._id;
    return await diagnosisService
      .addDiagnosis(userId, symptoms, diagnosis)
      .then((data) => res.json(data));
  }

  async getAllDiagnosisByUserID(req, res) {
    const userId = req.user._id;
    return await diagnosisService
      .getAllDiagnosisByUserID(userId)
      .then((data) => res.json(data));
  }

  async getIssuesListByDiagnosisID(req, res) {
    const id = req.params.id;
    return await diagnosisService
      .getIssuesListByDiagnosisID(id)
      .then((data) => res.json(data));
  }
}

module.exports = new DiagnosisController();
