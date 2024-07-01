const ScheduledMessageService = require('../services/schedule-message.service');
const { formatResponse } = require('../utils/formatter.utils');

exports.scheduleMessage = async (req, res) => {
  // #swagger.tags = ['Schedule Message']
  // #swagger.summary = 'Schedule message to temp-collection'
  /*
    #swagger.parameters['obj'] = {
        in: 'body',
        type: 'object',
        required: true,
        description: 'Schedule message details object',
        schema: {
            $message: "This message will schedule to save on our desired table on a later time",
            $day: "2024-07-01",
            $time: "14:30:00"
        }
    }
    */
  try {
    const { message, day, time } = req.body;

    const scheduleDate = new Date(`${day}T${time}`);

    if (isNaN(scheduleDate.getTime())) {
      return formatResponse(res, { error: 'Invalid date or time format' }, 500);
    }
    const payload = {
      message,
      scheduleDate: scheduleDate.toISOString(),
    };
    const newMessage = await ScheduledMessageService.save(payload);
    return formatResponse(res, newMessage, 200);
  } catch (error) {
    return formatResponse(res, { error: error.message }, 500);
  }
};
