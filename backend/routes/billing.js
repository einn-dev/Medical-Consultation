const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/billingCtrl');

router.get('/',              ctrl.getAll);
router.get('/search',        ctrl.search);       // ?name=Juan
router.post('/',             ctrl.create);
router.patch('/:id/pay',     ctrl.markAsPaid);   // Mark as Paid
router.delete('/:id',        ctrl.remove);

module.exports = router;
