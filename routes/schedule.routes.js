const express = require('express');

const { scheduleMessage } = require('../controllers/schedule.controller');
const Validator = require('../validations/validator');

const router = express.Router();

router.post('/', Validator('tempMessageValidation'), scheduleMessage);

module.exports = router;
