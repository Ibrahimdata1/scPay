import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import paymentRouter from "./routes/paymentRouter.js";
import storeRouter from "./routes/storeRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(dotenv());
app.use("/auth", authRouter);
app.use("/api", paymentRouter);
app.use("/api", storeRouter);
app.listen(process.env.PORT, () => {
  console.log(`server is listen in PORT: ${process.env.PORT}`);
});
