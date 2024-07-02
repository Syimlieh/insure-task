const PolicyInfo = require('../schema/policy-info.schema');

exports.save = async (payload) => {
  const policyInfo = new PolicyInfo(payload);
  return await policyInfo.save();
};

exports.findOne = async (query) => {
  const results = await PolicyInfo.findOne(query).populate("userId").lean();
  return results;
};
