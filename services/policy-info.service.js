const PolicyInfo = require('../schema/policy-info.schema');

exports.save = async (payload) => {
  const policyInfo = new PolicyInfo(payload);
  return await policyInfo.save();
};
