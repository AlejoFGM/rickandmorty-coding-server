import express from "express";
import userRouter from "./user";
import charactersRouter from "./character";

const router = express.Router();

router.use("/user", userRouter);
router.use("/characters", charactersRouter);

export default router;
