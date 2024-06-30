const mongoose = require('mongoose');
const { formatResponse } = require('../utils/formatter.utils');

const checkHeartbeat = async (req, res) => {
  // #swagger.tags = ['Heartbeat']
  // #swagger.summary = 'Check Heartbeat'
  const stats = await mongoose.connection.db.stats();
  return formatResponse(res, stats, 200);
};

module.exports = { checkHeartbeat };
