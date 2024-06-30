const User = require('../schema/user.schema');

exports.save = async (payload) => {
  const userAccount = new User(payload);
  return await userAccount.save();
};
