const { Schema, default: mongoose } = require('mongoose');
const config = require('../config/load.config').getCurrentEnvironmentConfig();

const PolicyCategorySchema = new Schema(
  {
    categoryName: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  config.collection.POLICY_CATEGORY,
  PolicyCategorySchema,
);
