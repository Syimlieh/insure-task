const PolicyCarrier = require('../schema/policy-carrier.schema');

exports.save = async (payload) => {
  const policyCarrier = new PolicyCarrier(payload);
  return await policyCarrier.save();
};
