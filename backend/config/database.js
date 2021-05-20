const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose.connect(
    process.env.DB_URI,
    {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    (err) => {
      if (err) return console.error(err);
      console.log("Connected to database");
    }
  );
};

module.exports = dbConnect;
