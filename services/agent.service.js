const Agent = require('../schema/agent.schema');

exports.save = async (payload) => {
  const agent = new Agent(payload);
  return await agent.save();
};
