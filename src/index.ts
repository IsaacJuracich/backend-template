import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose, { connect, ConnectOptions } from "mongoose";
import { MONGODB_URI, REDIS_URI } from "./constant";
import { createClient } from "redis";
import FileRouter from "./middleware/fileRouter";

mongoose.set("strictQuery", false);
export const client = createClient({
  url: REDIS_URI,
});

export async function init() {
  process.on("uncaughtException", (err) => {
    console.log(err);
  });

  const app = express();
  const router = express.Router();

  app.use(cors());
  app.use(
    bodyParser.json({
      limit: "50mb",
    })
  );
  app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
  app.use("/api", router);

  const server = createServer(app);
  const port = process.env.PORT || 3035;

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  await connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "backend-example",
  } as ConnectOptions).then(() => {
    console.log("Connected to MongoDB");
  });
  await client.connect();
  await FileRouter(router, __dirname);

  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: any) => {
    console.log("a user connected");
  });

  client.on("error", (err) => console.log("Redis Server Error", err));
}
init();
