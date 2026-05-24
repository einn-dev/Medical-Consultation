const mongoose = require('mongoose');

// Fields match: consultPatientName, diagnosis, prescription, consultDoctor
//               billConsultFee, billLabFee, billPrescFee
const consultationSchema = new mongoose.Schema({
  consultationID: { type: String, unique: true },
  patientName:    { type: String, required: true },
  diagnosis:      { type: String, required: true },
  prescription:   { type: String, required: true },
  doctor:         { type: String, required: true },
  consultFee:     { type: Number, default: 0 },
  labFee:         { type: Number, default: 0 },
  prescFee:       { type: Number, default: 0 },
  total:          { type: Number, default: 0 },
}, { timestamps: true });

consultationSchema.pre('save', async function (next) {
  if (!this.consultationID) {
    const count = await mongoose.model('Consultation').countDocuments();
    this.consultationID = `C${String(count + 1).padStart(3, '0')}`;
  }
  // Auto-calculate total
  this.total = this.consultFee + this.labFee + this.prescFee;
  next();
});

module.exports = mongoose.model('Consultation', consultationSchema);
