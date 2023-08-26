import express from "express";
import validateBody from "../../middleware/validateBody.js";
import ctrl from "../../controllers/subscribe.js";
import { subscribeSchema } from "../../models/subscribe.js";

const router = express.Router();

router.post("/", validateBody(subscribeSchema), ctrl.subscribe);

export default router;
