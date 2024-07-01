const express = require('express');
const router = express.Router();
const multer = require('multer');

const { uploadExcel } = require('../controllers/upload-excel.controller');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), uploadExcel);

module.exports = router;
