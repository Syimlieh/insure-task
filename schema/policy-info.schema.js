const { Schema, default: mongoose } = require('mongoose');
const { POLICY_TYPE } = require('../utils/constants.utils');
const config = require('../config/load.config').getCurrentEnvironmentConfig();

const PolicyInfoSchema = new Schema(
  {
    policyNumber: { type: String, required: true },
    policyStartDate: { type: String, required: true },
    policyEndDate: { type: String, required: true },
    policyMode: { type: String, required: true },
    producer: { type: String, required: true },
    premiumAmountWritten: { type: Number },
    premiumAmount: { type: Number, required: true },
    policyType: { type: String, enum: Object.values(POLICY_TYPE) },
    csr: { type: String, required: true },
    policyCategoryId: {
      type: Schema.Types.ObjectId,
      ref: config.collection.POLICY_CATEGORY,
      required: true,
    },
    policyCarrierId: {
      type: Schema.Types.ObjectId,
      ref: config.collection.POLICY_CARRIER,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: config.collection.USER,
      required: true,
    },
    agentId: {
      type: Schema.Types.ObjectId,
      ref: config.collection.AGENT,
      required: true,
    },
    userAccountId: {
      type: Schema.Types.ObjectId,
      ref: config.collection.USER_ACCOUNT,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  config.collection.POLICY_INFO,
  PolicyInfoSchema,
);
