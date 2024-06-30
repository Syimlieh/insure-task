const { formatResponse } = require('../utils/formatter.utils');
const UploadExcel = require('../services/upload-excel.service');

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
    if (!file) {
      return formatResponse(res, { data: 'Please upload a file.' }, 400);
    }
    await UploadExcel.processExcelFile(file.path);
    return formatResponse(res, 'Data Upload Successfully', 200);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return formatResponse(res, { error: error.message }, statusCode);
  }
};
