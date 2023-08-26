import express from "express";
import logger from "morgan";
import cors from "cors";
import cocktailsRouter from "./routes/api/cocktails.js";
import authRouter from "./routes/api/auth.js";
import subscribeRouter from "./routes/api/subscribe.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", authRouter);
app.use("/api", cocktailsRouter);
app.use("/subscribe", subscribeRouter);

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
	console.log("In APP ERROR", err);

	const { status = 500, message = "Server Error" } = err;
	res.status(status).json({ message: message });
});

export default app;
