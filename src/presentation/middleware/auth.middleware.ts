import { NextFunction, Request, Response } from "express";
import { JWTService } from "../../application/use_case/jwt.usecase.js";

const jwtService = new JWTService()

export const AuthMiddlewar = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required",
      });
    }

    const token = authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const decoded = jwtService.verifyToken(token)
    req.user = decoded
    next()

  } catch (error) {
    
     return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
    });
  }
};
