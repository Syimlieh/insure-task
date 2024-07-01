const { fetchFilterPipeline } = require("./general.pipeline");

const config = require("../config/load.config").getCurrentEnvironmentConfig();

const fetchAggregatedUserPipeline = (filters) => {

  const $lookup = {
    from: config.collection.POLICY_INFO,
    localField: "_id",
    foreignField: "userId",
    as: "policy",
  };

  const $unwind = { path: "$policy" };
  const pipeline = fetchFilterPipeline(filters);
  return [ { $lookup }, { $unwind }, ...pipeline];
};

module.exports = {
  fetchAggregatedUserPipeline,
};
