const ExcelJS = require('exceljs');
const { parentPort, workerData } = require('worker_threads');

const {
  validateHeaders,
  parseRowData,
  saveIfNotExists,
} = require('../utils/excel-utils');

// Services
const UserService = require('../services/user.service');
const UserAccountService = require('../services/user-account.service');
const PolicyCategoryService = require('../services/policy-category.service');
const PolicyCarrierService = require('../services/policy-carrier.service');
const PolicyService = require('../services/policy-info.service');
const AgentService = require('../services/agent.service');

const processCSVFile = async (filePath) => {
  try {
    // Processing logic here...
    const workbook = new ExcelJS.Workbook();
    await workbook.csv.readFile(filePath);

    const sheet = workbook.getWorksheet(1);

    const headerRow = sheet.getRow(1).values;
    const headerMap = validateHeaders(headerRow);

    const uploadPolicies = [];
    const usersMap = new Map();
    const policyCarriersMap = new Map();
    const policyCategoriesMap = new Map();
    const userAccountsMap = new Map();
    const agentsMap = new Map();

    for (let i = 2; i <= sheet.rowCount; i++) {
      const row = sheet.getRow(i);
      const rowData = parseRowData(row, headerMap);

      if (!rowData.isEmpty) {
        const userPayload = {
          firstName: rowData.data['firstname'],
          mobile: rowData.data['phone'],
          email: rowData.data['email'],
          dob: rowData.data['dob'],
          address: rowData.data['address'],
          state: rowData.data['state'],
          zip: rowData.data['zip'],
          gender: rowData.data['gender'],
          userType: rowData.data['userType'],
        };

        const userId = await saveIfNotExists(
          UserService,
          usersMap,
          userPayload,
        );

        const policyCarrierPayload = {
          companyName: rowData.data['company_name'],
        };

        const policyCarrierId = await saveIfNotExists(
          PolicyCarrierService,
          policyCarriersMap,
          policyCarrierPayload,
        );

        const policyCategoryPayload = {
          categoryName: rowData.data['category_name'],
        };

        const policyCategoryId = await saveIfNotExists(
          PolicyCategoryService,
          policyCategoriesMap,
          policyCategoryPayload,
        );

        const userAccountPayload = {
          accountName: rowData.data['account_name'],
          accountType: rowData.data['account_type'],
          userId,
        };

        const userAccountId = await saveIfNotExists(
          UserAccountService,
          userAccountsMap,
          userAccountPayload,
        );

        const agentPayload = {
          agentName: rowData.data['agent'],
        };

        const agentId = await saveIfNotExists(AgentService, agentsMap, agentPayload);

        // Create policy payload
        const policyPayload = {
          policyCategoryId,
          policyCarrierId,
          userId,
          userAccountId,
          agentId,
          agent: rowData.data['agent'],
          policyMode: rowData.data['policy_mode'],
          producer: rowData.data['producer'],
          policyNumber: rowData.data['policy_number'],
          premiumAmount_written: rowData.data['premium_amount_written'],
          premiumAmount: rowData.data['premium_amount'],
          policyType: rowData.data['policy_type'],
          policyStartDate: rowData.data['policy_start_date'],
          policyEndDate: rowData.data['policy_end_date'],
          csr: rowData.data['csr'],
        };

        const policy = await PolicyService.save(policyPayload);
        uploadPolicies.push(policy);
      }
    }

    return { success: true, data: uploadPolicies };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const processFile = async (filePath) => {
  const result = await processCSVFile(filePath);
  if (!result.success) {
    parentPort.postMessage({ status: 'error', error: result.error });
    return;
  }
  parentPort.postMessage({
    status: 'done',
    data: 'Data Uploaded Successfully',
  });
};

processFile(workerData.filePath);
