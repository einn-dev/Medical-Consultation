const mongoose = require('mongoose');

// Fields match: billingTable columns + manualBillingForm
// mBillPatientName, mBillConsult, mBillLab, mBillPresc
const billingSchema = new mongoose.Schema({
  billingCode:  { type: String, unique: true },
  patientName:  { type: String, required: true },
  consultFee:   { type: Number, default: 0 },
  labFee:       { type: Number, default: 0 },
  prescFee:     { type: Number, default: 0 },
  grandTotal:   { type: Number, default: 0 },
  status:       { type: String, default: 'Unpaid' }, // 'Unpaid' or 'Paid'
  // Optional: link to consultation
  consultationRef: { type: String, default: null },
}, { timestamps: true });

billingSchema.pre('save', async function (next) {
  if (!this.billingCode) {
    const count = await mongoose.model('Billing').countDocuments();
    this.billingCode = `B${String(count + 1).padStart(3, '0')}`;
  }
  this.grandTotal = this.consultFee + this.labFee + this.prescFee;
  next();
});

module.exports = mongoose.model('Billing', billingSchema);
