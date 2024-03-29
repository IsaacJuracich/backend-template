import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { REDIS_URI, SERVER_PORT } from "./constant";
import { createClient } from "redis";
import FileRouter from "./middleware/fileRouter";
import { Prisma, PrismaClient } from "@prisma/client";
import UserSession from "./middleware/session/user";
import { createUserToken } from "./libs/session";
import { createPrismaRedisCache } from "prisma-redis-middleware";

export const client = createClient({
  url: REDIS_URI,
});
export const prisma = new PrismaClient() as PrismaClient;

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
  const port = SERVER_PORT;

  await client.connect();
  await FileRouter(router, __dirname);

  server.listen(port, () => console.log(`Server listening on port ${port}`));

  client.on("error", (err) => console.log("Redis Server Error", err));
}
init();
