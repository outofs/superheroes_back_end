const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const connect = async () => {
  try {
    await mongoose.connect(DB);

    console.log("mongoDB connected!");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connect();
  console.log(`Server is running on localhost:${port}`);
});
