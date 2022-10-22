const mongoose = require("mongoose");

let connection;

async function connect() {
  if (connection) return;

  const mongoUri = process.env.MONGO_URI;
  connection = mongoose.connection;

  connection.once("open", () => {
    console.log("connection with mongo OK");
  });
  connection.on("disconnected", () => {
    console.log("Disconnected succesfull");
  });
  connection.on("error", (err) => {
    console.log("something went wrong!", err);
  });

  await mongoose.connect(
    "mongodb+srv://Admin:FsK4fYPkMIU5YV4T@cluster0.2xgv8.mongodb.net/favs-test?retryWrites=true&w=majority"
  );
}
async function disconnected() {
  if (!connection) return;
  await mongoose.disconnect();
}
async function cleanup() {
  for (const collection in connection.collections) {
    await connection.collections[collection].deleteMany({});
  }
}
module.exports = { connect, disconnected, cleanup };
