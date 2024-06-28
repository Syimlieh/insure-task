const mongoose = require('mongoose');

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  mongoose.set('strictQuery', true);
  connection.isConnected = db.connections[0].readyState;
}

module.exports = dbConnect;
