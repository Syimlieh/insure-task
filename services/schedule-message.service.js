const TempScheduleMessage = require('../schema/temp-message.schema');
const logger = require('../utils/logger.utils');

exports.save = async (payload) => {
  try {
    const message = new TempScheduleMessage(payload);
    const savedMessage = await message.save();
    return savedMessage;
  } catch (err) {
    logger.error(err.message);
    throw new Error('Failed to save message to the database.');
  }
};
