const HeartbeatRoutes = require('./routes/heartbeat.routes');

module.exports = (server) => {
  server.use('/api/v1/heartbeat', HeartbeatRoutes);
};
