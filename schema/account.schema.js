const { Schema, default: mongoose } = require('mongoose');
const { ACCOUNT_TYPE } = require('../utils/constants.utils');
const config = require('../config/load.config').getCurrentEnvironmentConfig();

const UserAccountSchema = new Schema(
  {
    accountName: { type: String, required: true },
    accountType: { type: String, enum: Object.values(ACCOUNT_TYPE) },
    userId: {
      type: Schema.Types.ObjectId,
      ref: config.collection.USER,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  config.collection.USER_ACCOUNT,
  UserAccountSchema,
);
