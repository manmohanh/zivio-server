import { Schema, model } from "mongoose";
import { AuthModelInterface } from "./auth.interface";
import {v4 as uuid} from "uuid"

const schema = new Schema<AuthModelInterface>(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
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

schema.pre("save",function(){
  this.refreshToken = uuid()
  this.expiredAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
})

const AuthModel = model<AuthModelInterface>("Auth", schema);
export default AuthModel;
