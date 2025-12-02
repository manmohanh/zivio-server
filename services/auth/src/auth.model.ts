import {
  Schema,
  model,
} from "mongoose";
import { AuthModelInterface } from "./auth.interface";

const schema = new Schema<AuthModelInterface>(
  {
    mobile: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    expiredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);


const AuthModel = model<AuthModelInterface>("Auth", schema);
export default AuthModel;
