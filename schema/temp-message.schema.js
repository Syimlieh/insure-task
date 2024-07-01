const mongoose = require('mongoose');

const config = require('../config/load.config').getCurrentEnvironmentConfig();

const TempMessageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    scheduleDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  config.collection.TEMP_SCHEDULE_MESSAGE,
  TempMessageSchema,
);
