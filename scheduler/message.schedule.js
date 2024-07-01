const cron = require('node-cron');
const TempScheduleMessage = require('../schema/temp-message.schema');
const ScheduleMessage = require('../schema/schedule-message.schema');
const logger = require('../utils/logger.utils');

const moveScheduledMessages = async () => {
  const currentDate = new Date();
  const nextRunDate = new Date(currentDate.getTime() + 5 * 60000);

  const query = {
    scheduleDate: {
      $gte: new Date(currentDate.toISOString()),
      $lt: new Date(nextRunDate.toISOString()),
    },
  };
  try {
    const messagesToMove = await TempScheduleMessage.find({
      $expr: {
        $and: [
          { $gte: [{ $toDate: '$scheduleDate' }, query.scheduleDate.$gte] },
          { $lt: [{ $toDate: '$scheduleDate' }, query.scheduleDate.$lt] },
        ],
      },
    });
    if (messagesToMove.length > 0) {
      const moveOperations = messagesToMove.map(async (message) => {
        const saveMessage = new ScheduleMessage({
          message: message.message,
        });
        await saveMessage.save();
        await TempScheduleMessage.findByIdAndDelete(message._id);
      });

      await Promise.all(moveOperations);
      logger.info(
        `Moved ${messagesToMove.length} messages to the main collection`,
      );
    }
  } catch (error) {
    logger.error('Error moving scheduled messages:', error);
  }
};

// Schedule the cron job to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
  logger.info('Running cron job to save shcedule message ------> ');

  moveScheduledMessages();
});
