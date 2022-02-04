import { model, Schema, SchemaTypes } from "mongoose";

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task = model("Task", taskSchema);

export default Task;
