const { Schema, default: mongoose } = require('mongoose');
const config = require('../config/load.config').getCurrentEnvironmentConfig();

const PolicyCarrierSchema = new Schema(
  {
    companyName: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  config.collection.POLICY_CARRIER,
  PolicyCarrierSchema,
);
