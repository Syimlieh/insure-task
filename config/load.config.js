require('dotenv').config();

module.exports = {
  getCurrentEnvironmentConfig: () => {
    let config;
    if (process.env.NODE_ENV === 'development') {
      config = require('./environment/environment.dev.json');
    } else {
      config = require('./environment/environment.local.json');
    }
    return config;
  },
};
