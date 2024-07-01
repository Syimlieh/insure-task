const express = require('express');

const { findPoliciesByUsername } = require('../controllers/policy.controller');

const router = express.Router();

router.post('/:username', findPoliciesByUsername);

module.exports = router;
