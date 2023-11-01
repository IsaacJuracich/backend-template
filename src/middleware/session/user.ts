import { Request, Response, NextFunction } from "express";

export default async function UserSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("UserSession", req.headers);
  next();
}
