import { client, prisma } from "@/index";
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

  const prismaUser = await getPrismaUser(user.id);

  if (!prismaUser)
    return res.status(401).json({
      message: "Unauthorized",
    });

  req.params = {
    ...req.params,
    userID: user.id,
  };

  return next();
}

async function getPrismaUser(id: string) {
  const isCached = await client.get(`user:${id}`);
  if (isCached) return JSON.parse(isCached);

  const prismaUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  await client.set(`user:${id}`, JSON.stringify(prismaUser));

  return prismaUser;
}
