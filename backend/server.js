import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(dotenv());
app.use("/auth", authRouter);
app.listen(process.env.PORT, () => {
  console.log(`server is listen in PORT: ${process.env.PORT}`);
});
