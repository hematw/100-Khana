import asyncHandler from "../middlewares/async-handler";
import User from "../models/User";
import { json, Request, Response } from "express";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
  };

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.body);

    const createdUser = await User.create(req.body);
    const token = await createdUser.generateToken();
    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({
        success: true,
        token,
        createdUser: { ...createdUser.toJSON(), password: undefined },
      });
  }
);

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser && (await foundUser.isPasswordCorrect(password))) {
    const token = await foundUser.generateToken();
    return res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({ success: true, token });
  }
  return res.status(401).json({ msg: "wrong credentials!" });
});
