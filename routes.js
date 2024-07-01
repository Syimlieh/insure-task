const HeartbeatRoutes = require('./routes/heartbeat.routes');
const UploadDataRoutes = require('./routes/upload-excel.routes');
const PolicyRoutes = require('./routes/policy.routes');
const UserRoutes = require('./routes/user.routes');
const ScheduleRoutes = require('./routes/schedule.routes');

module.exports = (server) => {
  server.use('/api/v1/heartbeat', HeartbeatRoutes);

  server.use('/api/v1/upload', UploadDataRoutes);

  server.use('/api/v1/policy', PolicyRoutes);

  server.use('/api/v1/user', UserRoutes);

  server.use('/api/v1/schedule', ScheduleRoutes);
};
