const expectedHeaders = [
  'agent',
  'userType',
  'policy_mode',
  'producer',
  'policy_number',
  'premium_amount_written',
  'premium_amount',
  'policy_type',
  'company_name',
  'category_name',
  'policy_start_date',
  'policy_end_date',
  'csr',
  'account_name',
  'email',
  'gender',
  'firstname',
  'city',
  'account_type',
  'phone',
  'address',
  'state',
  'zip',
  'dob',
];

const validateHeaders = (sheet) => {
  const row = sheet.getRow(1);
  const headerData = {
    isValid: true,
    row: 'Header',
    issues: [],
    headerMap: {},
  };

  expectedHeaders.forEach((headerValue, index) => {
    const cell = row.getCell(index + 1);
    const cellText = cell.text ? cell.text.trim() : cell.text;

    if (cellText !== headerValue) {
      headerData.isValid = false;
      headerData.issues.push(headerValue);
    } else {
      headerData.headerMap[headerValue] = index + 1;
    }
  });

  return headerData;
};

const parseRowData = (row, headerMap) => {
  const rowData = {
    isEmpty: true,
    data: {},
  };

  expectedHeaders.forEach((headerName) => {
    const cell = row.getCell(headerMap[headerName]);
    rowData.data[headerName] = cell.text;

    if (cell.text && cell.text.trim() !== '') {
      rowData.isEmpty = false;
    }
  });

  return rowData;
};

const saveIfNotExists = async (service, cache, payload) => {
  const key = JSON.stringify(payload);
  if (cache.has(key)) {
    return cache.get(key);
  }

  const savedData = await service.save(payload);
  const data = savedData.toObject();
  cache.set(key, data?._id);
  return data?._id;
};

module.exports = {
  expectedHeaders,
  validateHeaders,
  parseRowData,
  saveIfNotExists,
};
