const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/authCtrl');

router.post('/login', ctrl.login);

module.exports = router;
