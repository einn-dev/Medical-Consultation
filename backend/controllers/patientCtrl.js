const Patient = require('../models/Patient');

// GET all patients
exports.getAll = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create patient
exports.create = async (req, res) => {
  try {
    const { name, birthdate, gender, contact, address, history } = req.body;
    const patient = new Patient({ name, birthdate, gender, contact, address, history });
    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE patient
exports.remove = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET count (for dashboard card)
exports.getCount = async (req, res) => {
  try {
    const count = await Patient.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
