const { Schema, default: mongoose } = require('mongoose');

const config = require('../config/load.config').getCurrentEnvironmentConfig();

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String },
    state: { type: String },
    zip: { type: String },
    gender: { type: String },
    userType: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(config.collection.USER, UserSchema);
