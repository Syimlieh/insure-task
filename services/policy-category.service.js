const PolicyCategory = require('../schema/policy-category.schema');

exports.save = async (payload) => {
  const policyCategory = new PolicyCategory(payload);
  return await policyCategory.save();
};
