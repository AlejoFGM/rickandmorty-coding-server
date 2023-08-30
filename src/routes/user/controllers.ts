import { Request, Response } from "express";
import { BodyResponse } from "../../interfaces/body-response";
import { CustomError } from "../../models/custom-errors";
import UserModel from "../../models/user";
import { UserData } from "./types";

const getAllUsers = async (
  req: Request,
  res: Response<BodyResponse<UserData[]>>
) => {
  const allUsers = await UserModel.find(req.query);

  return res.status(200).json({
    message: "Users obtained successfully.",
    data: allUsers,
    error: false,
  });
};

const createUser = async (
  req: Request,
  res: Response<BodyResponse<UserData>>
) => {
  try {
    const isUsed = await UserModel.findOne({ email: req.body.email });
    if (isUsed) {
      throw new CustomError(
        400,
        `User with email ${req.body.email} is already registered.`
      );
    }

    const newUser = new UserModel({
      ...req.body,
    });

    const successData = await newUser.save();

    return res.status(201).json({
      message: "User created successfully.",
      data: successData,
      error: false,
    });
  } catch (error: any) {
    throw new CustomError(500, error.message);
  }
};

export default {
  getAllUsers,
  createUser,
};
