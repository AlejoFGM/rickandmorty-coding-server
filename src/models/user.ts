import { InferSchemaType, model, Schema } from "mongoose";

import { UserData } from "../routes/user/types";

export const userSchema = new Schema({
  firebaseUid: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  favoriteCharacters: [
    {
      type: String,
      required: false,
    },
  ],
});

export type User = InferSchemaType<typeof userSchema>;

export default model<UserData>("User", userSchema);
