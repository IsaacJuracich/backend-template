import { RequestHandler } from "express";
import fetch from "node-fetch";
import { client } from "../";

export const handler: RequestHandler = async (req, res) => {
  const resp = await fetch("https://jsonplaceholder.typicode.com/todos");

  const cached = await client.get("todos");
  console.log(cached ? "cached" : "not cached");

  if (cached) {
    return res.send(JSON.parse(cached));
  }

  const data = await resp.json();

  await client.set("todos", JSON.stringify(data));
  return res.send(data);
};
