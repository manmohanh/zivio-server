import {
  AuthModelInterface,
  MessageInterface,
  VerifyOtpInterface,
} from "./auth.interface";
import AuthModel from "./auth.model";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

const getAccessToken = async (auth: AuthModelInterface): Promise<string> => {
  const payload = {
    id: auth._id,
    mobile: auth.mobile,
  };
  const expiresIn = parseInt(process.env.ACCESS_TOKEN_EXPIRY as string);
  const secret = process.env.AUTH_SECRET as string;

  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const signup = async (body: any): Promise<MessageInterface> => {
  await Promise.all([AuthModel.create(body), sendOtp({ mobile: body.mobile })]);

  return { message: "Sign up sucess" };
};

export const sendOtp = async (body: any): Promise<MessageInterface> => {

  const auth = await AuthModel.findOne({mobile:body.mobile})
  if(!auth)
    throw new Error("User not found try to signup first")
  // const authPayload = {
  //   mobile: body.mobile,
  //   refreshToken: uuid(),
  //   expiredAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  // };

  // await AuthModel.findOneAndUpdate(
  //   { mobile: body.mobile },
  //   { $set: authPayload },
  //   { upsert: true, new: true }
  // );

  return { message: "Otp sent successfully" };
};

export const verifyOtp = async (body: any): Promise<VerifyOtpInterface> => {
  const auth = await AuthModel.findOne({ mobile: body.mobile }).lean();
  if (!auth) throw new Error("User doesn't exist");

  if (body.otp !== "1234") throw new Error("Otp verification failed");

  const accessToken = await getAccessToken(auth);

  return {
    message: "Otp verified successfully",
    accessToken,
    refreshToken: auth.refreshToken,
  };
};

export const resendOtp = async (): Promise<MessageInterface> => {
  return { message: "resend otp" };
};
