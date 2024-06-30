const HeartbeatRoutes = require('./routes/heartbeat.routes');
const UploadDataRoutes = require('./routes/upload-excel.routes');

module.exports = (server) => {
  server.use('/api/v1/heartbeat', HeartbeatRoutes);

  server.use('/api/v1/upload', UploadDataRoutes);
};
