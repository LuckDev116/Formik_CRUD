const mongoose = require("mongoose");

const DB_URL = process.env.DB_URL || "DB_URL=mongodb+srv://root:rootroot@cluster0.r8bms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB is connected!!");
  } catch (err) {
    console.log("Failed to connect to DB", err);
  }
};

module.exports = connectDB