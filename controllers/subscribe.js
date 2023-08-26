import ctrlWrapper from "./ctrlWrapper.js";
import sendEmail from "../helpers/sendEmail.js";
import { HttpError } from "../helpers/HttpError.js";
import { Subscribe } from "../models/subscribe.js";

// const fs = require("fs");
import fs from "node:fs";

// Чтение содержимого HTML-файла

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
		// html: `<p>You are subscribed to our newsletter</p>`,
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

//export

export default ctrl;
