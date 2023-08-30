import { Request, Response } from "express";
import { BodyResponse } from "../../interfaces/body-response";
import firebaseApp from "../../helpers/firebase";
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
      console.log(isUsed);
      throw new Error(
        `User with email ${req.body.email} is already registered.`
      );
    }

    const newFirebaseUser = await firebaseApp.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = new UserModel({
      nickname: req.body.nickname,
      email: req.body.email,
      firebaseUid: newFirebaseUser?.uid,
    });

    const successData = await newUser.save();

    return res.status(201).json({
      message: "User created successfully.",
      data: successData,
      error: false,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Server error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const addFavoriteCharacter = async (
  req: Request,
  res: Response<BodyResponse<UserData>>
) => {
  try {
    const userById = await UserModel.findOne({ _id: req.params.id });

    if (!userById) {
      throw new Error(`No user found with ID ${req.params.id}.`);
    }

    const characterFound = userById.favoriteCharacters?.some(
      (id) => id === req.body.favoriteCharacter
    );

    const response = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        [characterFound ? "$pull" : "$push"]: {
          favoriteCharacters: req.body.favoriteCharacter,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      message: `Favorite character ${
        characterFound ? "deleted" : "added"
      } successfully`,
      data: response || ({} as UserData),
      error: false,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: `Server error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  getAllUsers,
  createUser,
  addFavoriteCharacter,
};
