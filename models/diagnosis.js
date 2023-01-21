// Define schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiagnosisSchema = new Schema(
  {
    _id: { type: String, required: true },
    userId: { type: String },
    diagnosis: [
      {
        _id: String,
        issueId: Number,
        name: String,
        profname: String,
        accuracy: Number,
        ranking: Number,
        cause: String,
      },
    ],
    selectedSymptoms: [
      {
        symptomId: Number,
        name: String,
      },
    ],
  },
  {
    timestamps: {
      createDate: "created_at",
      updateDate: "updated_at",
    },
  }
);

const Diagnosis = mongoose.model("diagnosises", DiagnosisSchema);

module.exports = {
  Diagnosis,
};
