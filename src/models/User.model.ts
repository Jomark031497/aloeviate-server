import { model, Schema, SchemaTypes } from "mongoose";
import { hash, genSalt } from "bcrypt";

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

userSchema.pre("save", async (next) => {
  let user: any = this;
  const salt = await genSalt();
  const hashPassword = await hash(user.password, salt);
  user.password = hashPassword;
  next();
});

export default model("User", userSchema);
