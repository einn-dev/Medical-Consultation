const Billing = require('../models/Billing');

exports.getAll = async (req, res) => {
  try {
    const bills = await Billing.find().sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Manual billing - matches manualBillingForm
exports.create = async (req, res) => {
  try {
    const { patientName, consultFee, labFee, prescFee } = req.body;
    const billing = new Billing({
      patientName,
      consultFee: parseFloat(consultFee) || 0,
      labFee:     parseFloat(labFee)     || 0,
      prescFee:   parseFloat(prescFee)   || 0,
      status: 'Unpaid',
    });
    await billing.save();
    res.status(201).json(billing);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PATCH - Mark as Paid (mirrors markAsPaid() in frontend)
exports.markAsPaid = async (req, res) => {
  try {
    const bill = await Billing.findByIdAndUpdate(
      req.params.id,
      { status: 'Paid' },
      { new: true }
    );
    if (!bill) return res.status(404).json({ error: 'Billing record not found' });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Billing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Billing record deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search by patient name - mirrors searchBillingRecords()
exports.search = async (req, res) => {
  try {
    const { name } = req.query;
    const bills = await Billing.find({
      patientName: { $regex: name, $options: 'i' }
    }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
