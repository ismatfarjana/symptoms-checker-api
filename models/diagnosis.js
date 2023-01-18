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
        name: String,
        accuracy: Number,
        ranking: Number,
      },
    ],
    selectedSymptoms: [{ type: String }],
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
