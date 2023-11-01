import { getUserToken } from "@/libs/session";
import { Request, Response, NextFunction } from "express";

export default async function UserSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const headers = req.headers;
  const token = headers["x-token"] as string;

  if (!token)
    return res.status(401).json({
      message: "Unauthorized",
    });

  const user = await getUserToken(token);

  if (!user)
    return res.status(401).json({
      message: "Unauthorized",
    });

  req.params = {
    ...req.params,
    userID: user.id,
  };

  return next();
}
