const diagnosisService = require("../services/diagnosis");

class DiagnosisController {
  async addDiagnosis(req, res) {
    const { symptoms, diagnosis } = req.body;
    console.log("req.body:", req.body);
    const userId = req.user._id;

    return await diagnosisService
      .addDiagnosis(userId, symptoms, diagnosis)
      .then((data) => res.json(data));
  }
}

module.exports = new DiagnosisController();
