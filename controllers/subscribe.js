import ctrlWrapper from "../helpers/ctrlWrapper.js";
import sendEmail from "../helpers/sendEmail.js";
import { HttpError } from "../helpers/HttpError.js";
import { Subscribe } from "../models/subscribe.js";
import fs from "node:fs";


const subscribe = async (req, res) => {
  const { email } = req.body;

  const subscription = await Subscribe.findOne({ email });

  if (subscription) {
    throw HttpError(409, "Already subscribed to this email");
  }

  await Subscribe.create({
    ...req.body,
    subscribe: true,
  });
  const emailTemplate = fs.readFileSync("subscibeEmail.html", "utf8");

  const subscribeEmail = {
    to: email,
    subject: "Subscribe email",
    html: emailTemplate,
  };
  await sendEmail(subscribeEmail);

  res.status(200).json({
    message: "Subscribe email sent",
  });
};

const ctrl = {
  subscribe: ctrlWrapper(subscribe),
};



export default ctrl;
