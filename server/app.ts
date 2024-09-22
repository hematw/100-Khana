import { config as dotEnvConfig } from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/auth-router";
import morgan from "morgan";
import connectDb from "./db/connect";
import errorHandler from "./middlewares/error-handler";

dotEnvConfig();
const app = express();
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Route handlers
app.get("/api/v1", (req: Request, res: Response) => {
  res.send("hello world");
});

// Auth route
app.use("/api/v1/auth", authRouter);
app.use(errorHandler);

const start = async () => {
  try {
    if (process.env.MONGO_STRING) {
      await connectDb(process.env.MONGO_STRING);
    }
    app.listen(3000, () => console.log(`server is running on port ${port}`));
  } catch (error) {}
};
start();
