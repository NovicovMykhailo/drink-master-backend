import express from "express";
import ctrl from "../../controllers/auth.js";
import { registerSchema, authSchema } from "../../models/user.js";
import validateBody from "../../middleware/validateBody.js";
import authenticate from "../../middleware/authenticate.js";
// import upload from "../../middleware/upload.js";
import upload from "../../middleware/cloudinaryUpload.js";
// import resize from "../../middleware/resize.js";

const router = express.Router();

//signup
router.post("/register", validateBody(registerSchema), ctrl.register);

//signin
router.post("/login", validateBody(authSchema), ctrl.login);

// current user info
router.get("/current", authenticate, ctrl.getCurrent);

//logout
router.post("/logout", authenticate, ctrl.logout);

//change subscription
// router.patch("/", authenticate, validateBody(subscriptionSchema), ctrl.changeSubscription);

// update user
// router.patch("/update", authenticate, upload.single("avatar"), resize, ctrl.updateAvatar);
// router.post('/user', authenticate, upload.single('avatar'), ctrl.addAvatar);

router.patch("/update", authenticate, upload.single('avatarURL'),  ctrl.updateUserInfo);

export default router;
