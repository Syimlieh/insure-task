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

const validateHeaders = (row) => {
  const headerMap = {};
  expectedHeaders.forEach((headerValue, index) => {
    const cellText = row[index + 1] ? row[index + 1].trim() : '';

    if (cellText === headerValue) {
      headerMap[headerValue] = index + 1;
    } else {
      throw new Error(`Invalid header: ${cellText}, expected: ${headerValue}`);
    }
  });

  return headerMap;
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
