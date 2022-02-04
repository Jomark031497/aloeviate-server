import { model, Schema, SchemaTypes } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      trim: true,
      select: false,
    },
    tasks: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Task",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
