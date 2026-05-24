const mongoose = require('mongoose');

// Fields match: appointmentPatient, appointmentDoctor, appointmentDate, appointmentPurpose
const appointmentSchema = new mongoose.Schema({
  appointmentID: { type: String, unique: true },
  patient:       { type: String, required: true },
  doctor:        { type: String, required: true },
  date:          { type: String, required: true },
  purpose:       { type: String, required: true },
  status:        { type: String, default: 'Scheduled' },
}, { timestamps: true });

appointmentSchema.pre('save', async function (next) {
  if (!this.appointmentID) {
    const count = await mongoose.model('Appointment').countDocuments();
    this.appointmentID = `A${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);
