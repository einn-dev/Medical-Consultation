const Consultation = require('../models/Consultation');
const Billing      = require('../models/Billing');

exports.getAll = async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// When a consultation is saved, it automatically creates a billing record
// This mirrors the frontend behavior: "Save & Process to Billing"
exports.create = async (req, res) => {
  try {
    const { patientName, diagnosis, prescription, doctor, consultFee, labFee, prescFee } = req.body;

    // 1. Save consultation
    const consultation = new Consultation({
      patientName, diagnosis, prescription, doctor,
      consultFee: parseFloat(consultFee) || 0,
      labFee:     parseFloat(labFee)     || 0,
      prescFee:   parseFloat(prescFee)   || 0,
    });
    await consultation.save();

    // 2. Auto-create linked billing record
    const billing = new Billing({
      patientName,
      consultFee:      parseFloat(consultFee) || 0,
      labFee:          parseFloat(labFee)     || 0,
      prescFee:        parseFloat(prescFee)   || 0,
      consultationRef: consultation.consultationID,
      status:          'Unpaid',
    });
    await billing.save();

    res.status(201).json({ consultation, billing });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Consultation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Consultation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCount = async (req, res) => {
  try {
    const count = await Consultation.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
