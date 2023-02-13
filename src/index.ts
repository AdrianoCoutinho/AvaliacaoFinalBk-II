import express from "express";
import { userRoutes } from "./routes/users.routes";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes());

app.listen(process.env.PORT, () => {
  console.log(`A API está rodando na porta ${process.env.PORT}!`);
});
