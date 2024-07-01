const mongoose = require('mongoose');

const config = require('../config/load.config').getCurrentEnvironmentConfig();

const ScheduledMessageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  config.collection.SCHEDULE_MESSAGE,
  ScheduledMessageSchema,
);
