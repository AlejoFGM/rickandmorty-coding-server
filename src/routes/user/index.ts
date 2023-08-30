import express from "express";

import controllers from "./controllers";

const router = express.Router();

router.route("/").get(controllers.getAllUsers).post(controllers.createUser);
router.route("/favorite/:id").patch(controllers.addFavoriteCharacter);

export default router;
