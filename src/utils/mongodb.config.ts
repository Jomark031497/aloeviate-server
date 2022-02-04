import mongoose from "mongoose";

const dbConnect = () => {
  mongoose.connect(
    <string>process.env.DB_URI,
    {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
    },
    (err) => {
      if (err) return console.error(err);
      console.log("Connected to database");
    }
  );
};

export default dbConnect;
