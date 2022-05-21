const express = require('express');
const router = express.Router();
const path = require('path');
const { indexController } = require('../controllers/main.controller');

router.get('/', indexController.getIndex);

module.exports = router;