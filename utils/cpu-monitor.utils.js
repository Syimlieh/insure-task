const os = require('os');
const pm2 = require('pm2');
const logger = require('./logger.utils');

const cpuThreshold = process.env.CPU_THRESHOLD; // CPU usage percentage threshold

function getCpuUsage() {
  const cpus = os.cpus();

  let user = 0;
  let nice = 0;
  let sys = 0;
  let idle = 0;
  let irq = 0;

  for (let cpu of cpus) {
    user += cpu.times.user;
    nice += cpu.times.nice;
    sys += cpu.times.sys;
    idle += cpu.times.idle;
    irq += cpu.times.irq;
  }

  const total = user + nice + sys + idle + irq;

  return {
    idle,
    total,
  };
}

let startMeasure = getCpuUsage();

function calculateCpuUsage(start, end) {
  const idleDifference = end.idle - start.idle;
  const totalDifference = end.total - start.total;
  const percentageCpu = 100 - (100 * idleDifference) / totalDifference;

  return percentageCpu;
}

function monitorCpuUsage() {
  const endMeasure = getCpuUsage();
  const cpuUsage = calculateCpuUsage(startMeasure, endMeasure);
  logger.info(`CPU Usage: ${cpuUsage}%`);

  if (cpuUsage > cpuThreshold) {
    logger.info('CPU usage exceeded 70%, restarting server...');

    pm2.connect((err) => {
      if (err) {
        logger.error('Error connecting to PM2:', err);
        return;
      }

      pm2.restart('server', (err) => {
        if (err) {
          logger.error('Error restarting server:', err);
          pm2.disconnect();
          return;
        }

        pm2.disconnect((err) => {
          if (err) {
            logger.error('Error disconnecting from PM2:', err);
          }
        });
      });
    });
  }

  startMeasure = endMeasure;
}

function startMonitoring() {
  setInterval(monitorCpuUsage, process.env.MONITOR_INTERVAL);
}

module.exports = {
  startMonitoring,
};
