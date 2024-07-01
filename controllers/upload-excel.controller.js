const { Worker } = require('worker_threads');
const path = require('path');
const { formatResponse } = require('../utils/formatter.utils');

exports.uploadExcel = async (req, res) => {
  // #swagger.tags = ['Upload']
  // #swagger.summary = 'Upload Excel file'
  /*
    #swagger.parameters['file'] = {
        in: 'formData',
        type: 'file',
        required: true
    }
  */
  try {
    const file = req.file;
    const fileType = file.mimetype.split('/').pop();
    if (!file || fileType !== 'csv') {
      return formatResponse(res, { error: 'Please upload a csv file.' }, 400);
    }

    const worker = new Worker(
      path.resolve(__dirname, '../workers/upload-excel.worker.js'),
      {
        workerData: { filePath: file.path },
      },
    );

    let responseSent = false;
    worker.on('message', (message) => {
      console.log('message ---->', message);
      if (message.status === 'done') {
        responseSent = true;
        return formatResponse(res, message, 200);
      } else if (message.status === 'error') {
        responseSent = true;
        return formatResponse(res, { error: message.error }, 500);
      }
    });

    worker.on('error', (error) => {
      if (!responseSent) {
        responseSent = true;
        return formatResponse(res, { error: error.message }, 500);
      }
    });

    worker.on('exit', (code) => {
      if (code !== 0 && !responseSent) {
        responseSent = true;
        return formatResponse(
          res,
          { error: `Worker stopped with exit code ${code}` },
          500,
        );
      }
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return formatResponse(res, { error: error.message }, statusCode);
  }
};
