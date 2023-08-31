import express from "express";
import controllers from "./controllers";
import authMiddleware from "../../middlewares/firebase";

const router = express.Router();

router.route("/:sortby/:page").get(authMiddleware, controllers.getCharacters);

export default router;
