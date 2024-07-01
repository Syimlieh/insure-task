const express = require('express');

const { findUsers } = require('../controllers/user.controller');

const Validator = require('../validations/validator');

const router = express.Router();

router.get('/', Validator('sortingPaginationValidation'), findUsers);

module.exports = router;
