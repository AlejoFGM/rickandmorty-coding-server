import express from "express";

import controllers from "./controllers";
import authMiddleware from "../../middlewares/firebase";

const router = express.Router();

router.route("/").get(controllers.getAllUsers).post(controllers.createUser);
router
  .route("/favorite/:id")
  .patch(authMiddleware, controllers.addFavoriteCharacter);

export default router;
