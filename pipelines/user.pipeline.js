const { fetchFilterPipeline } = require("./general.pipeline");

const config = require("../config/load.config").getCurrentEnvironmentConfig();

const fetchAggregatedUserPipeline = (filters) => {

  const $lookup = {
    from: config.collection.POLICY_INFO,
    localField: "_id",
    foreignField: "userId",
    as: "policy",
  };

  const pipeline = fetchFilterPipeline(filters);
  return [ { $lookup }, ...pipeline];
};

module.exports = {
  fetchAggregatedUserPipeline,
};
