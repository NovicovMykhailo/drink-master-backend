import express from "express";

const router = express.Router();

router.post("/", validation(schemas.userEmailSchema), authCtrl.resendVerify);

export default router;
