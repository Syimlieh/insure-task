const UserAccount = require('../schema/account.schema');

exports.save = async (payload) => {
  const userAccount = new UserAccount(payload);
  return await userAccount.save();
};
