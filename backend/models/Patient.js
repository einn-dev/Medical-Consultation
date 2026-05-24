const mongoose = require('mongoose');

// Fields match: patientName, patientBirthdate, patientGender,
//               patientContact, patientAddress, patientHistory
const patientSchema = new mongoose.Schema({
  patientID:  { type: String, unique: true },
  name:       { type: String, required: true },
  birthdate:  { type: String, required: true },
  gender:     { type: String, required: true },
  contact:    { type: String, required: true },
  address:    { type: String, required: true },
  history:    { type: String, default: '' },
}, { timestamps: true });

// Auto-generate patientID before saving (e.g. P001, P002...)
patientSchema.pre('save', async function (next) {
  if (!this.patientID) {
    const count = await mongoose.model('Patient').countDocuments();
    this.patientID = `P${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Patient', patientSchema);
