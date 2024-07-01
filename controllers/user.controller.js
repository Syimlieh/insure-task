const UserService = require('../services/user.service');
const { formatResponse } = require('../utils/formatter.utils');

exports.findUsers = async (req, res) => {
  // #swagger.tags = ['User']
  // #swagger.summary = 'Fetch Aggregated Users with it's policy'
  /*
    #swagger.parameters['limit'] = {
      in: 'query',
      type: 'string',
      required: false,
      description: 'Number of items per page'
    }
    #swagger.parameters['page'] = {
      in: 'query',
      type: 'string',
      required: false,
      description: 'Page number'
    }
    #swagger.parameters['order_by'] = {
      in: 'query',
      type: 'string',
      required: false,
      description: 'Default: updatedAt'
    }
    #swagger.parameters['order_direction'] = {
      in: 'query',
      type: 'string',
      required: false,
      description: 'Possible value: [ASC, DESC]'
    }
  */
  try {
    const filters = req.query;
    const users = await UserService.findUsers(filters);
    return formatResponse(res, users, 200);
  } catch (error) {
    return formatResponse(res, { error: error.message }, 500);
  }
};
