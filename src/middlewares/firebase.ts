import { NextFunction, Response } from "express";
import firebase from "../helpers/firebase";

const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }
    const response = await firebase.auth().verifyIdToken(token);
    req.firebaseUid = response.uid;
    return next();
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};

export default authMiddleware;
