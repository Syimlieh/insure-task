const { Schema, default: mongoose } = require('mongoose');

const config = require('../config/load.config').getCurrentEnvironmentConfig();

const AgentSchema = new Schema(
  {
    agentName: { type: String, required: true },
    mobile: { type: String },
    email: { type: String },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(config.collection.AGENT, AgentSchema);
