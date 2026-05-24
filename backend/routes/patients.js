const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/patientCtrl');

router.get('/',        ctrl.getAll);
router.get('/count',   ctrl.getCount);
router.post('/',       ctrl.create);
router.delete('/:id',  ctrl.remove);

module.exports = router;
