import express from "express";
import morgan from "morgan";
import cors from "cors"; 
import dotenv from "dotenv";
import mongoose from "mongoose";

import {router as usersRouter} from "./routes/contactsRouter.js";
import {router as contactsRouter} from "./routes/contactsRouter.js";

const app = express();

dotenv.config();

mongoose
.connect(process.env.DB_HOST)
.then(() => console.log("Database connection successful"))
.catch((error) => {
  console.log(error.message);
  process.exit(1); // вихід з програми
});

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

const pathPrefix = '/api/v1';

app.use(`${pathPrefix}/contacts`, contactsRouter);
app.use(`${pathPrefix}/users`, usersRouter);


app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const port = +process.env.PORT

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});