const UserService = require('../services/user.service');
const PolicyInfoService = require('../services/policy-info.service');
const { formatResponse } = require('../utils/formatter.utils');

exports.findPoliciesByUsername = async (req, res) => {
  // #swagger.tags = ['Policy']
  // #swagger.summary = 'Fetch policy by username'
  /*
      #swagger.parameters['username'] = {
        in: 'path',
        type: 'string',
        required: true,
        description: 'username'
      }
    */
  try {
    const { username } = req.params;

    // Find the user by username
    const user = await UserService.findUser({ firstName: username });
    // Find policies by userId
    const policies = await PolicyInfoService.findOne({
      userId: user?._id,
    });
    return formatResponse(res, policies, 200);
  } catch (error) {
    return formatResponse(res, { error: error.message }, 500);
  }
};
