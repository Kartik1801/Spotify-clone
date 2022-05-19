import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { SPOTIFY_CLONE_ACCESS_TOKEN } = req.cookies;
    if (SPOTIFY_CLONE_ACCESS_TOKEN) {
      let user;
      try {
        const { id } = jwt.verify(SPOTIFY_CLONE_ACCESS_TOKEN, "secret");
        user = await prisma.user.findUnique({
          where: { id },
        });
        if (!user) {
          throw new Error("Not Authenticated");
        }
      } catch (error) {
        res.status(401);
        res.json({
          error: "Not Authorized",
        });
        return;
      }
      return handler(req, res, user);
    }
    res.status(401);
    res.json({
      error: "Not Authorized",
    });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, "secret");
  return user;
};
