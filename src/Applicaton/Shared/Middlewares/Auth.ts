import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

export const AuthMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(400).json({
      satusCode: 400,
      message: "token required"
    })
  }

  if (!(authorization.split(" ")[0] === "Bearer")) {
    return response.status(400).json({
      statusCode: 400,
      message: "badly formatted token"
    })
  }

  const token = authorization.split(" ")[1]

  if (!token) {
    return response.status(400).json({
      statusCode: 400,
      message: "badly formatted token"
    })
  }

  let payload;

  try {
    payload = verify(token, process.env.JWT_SCRET as string);
  } catch(error) {
    console.log("errror")
    return response.status(401).json({
      statusCode: 401,
      message: "unauthorizated"
    })
  }

  request.body.payload = payload;

  next();
}