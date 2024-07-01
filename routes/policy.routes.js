const express = require('express');

const { findPoliciesByUsername } = require('../controllers/policy.controller');

const Validator = require('../validations/validator');

const router = express.Router();

router.get('/:username', Validator('usernameValidation', false, true), findPoliciesByUsername);

module.exports = router;
