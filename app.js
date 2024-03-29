import express from "express";
import logger from "morgan";
import cors from "cors";
import cocktailsRouter from "./routes/api/cocktails.js";
import authRouter from "./routes/api/auth.js";
import subscribeRouter from "./routes/api/subscribe.js";
import swaggerRouter from "./routes/swagger/swagger.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users", authRouter);
app.use("/api", cocktailsRouter);
app.use("/subscribe", subscribeRouter);
app.use("/api-docs", swaggerRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log("In APP ERROR", err);

  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message: message });
});

export default app;

const smallUnsleepOperation = async () => {
  await fetch("https://drink-master-back-end.onrender.com/api-docs/");
  const request = await fetch("https://drink-master-back-end.onrender.com/api-docs/");
  console.log("self ping request", request.status);
  return request;
};

setInterval(() => smallUnsleepOperation(), 480000);
