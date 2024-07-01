const User = require('../schema/user.schema');
const connectDB = require('../config/db/connect.db');

// Ensure shared connection in worker threads
exports.save = async (payload) => {
  await connectDB();
  const userAccount = new User(payload);
  return await userAccount.save();
};

exports.findUser = async (query) => {
  const result = await User.findOne(query);
  if (!result) {
    const error = new Error(`User Not Found.`);
    error.statusCode = 404;
    throw error;
  }
  return result;
};
