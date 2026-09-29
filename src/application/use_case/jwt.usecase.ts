import { IJWTService } from "../../domain/interface/jwt.service.js";
import jwt from "jsonwebtoken";

export class JWTService implements IJWTService {
    
  generateToken(payload: { id: string; role: string }): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });
  }

  verifyToken(token: string): { id: string; role: string } {
    return jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: string;
    };
  }

}
