import { RequestHandler } from "express";

export const post: RequestHandler = async (req, res) => {
  const { userID } = req.params;

  // @ts-ignore
  console.log("req.params", req.params);

  return res.status(200).json({
    message: "Success",
    userID,
  });
};
