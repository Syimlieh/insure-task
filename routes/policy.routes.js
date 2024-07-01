const express = require('express');

const { findPoliciesByUsername } = require('../controllers/policy.controller');

const router = express.Router();

router.get('/:username', findPoliciesByUsername);

module.exports = router;
