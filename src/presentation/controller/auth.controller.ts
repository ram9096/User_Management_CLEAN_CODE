import { IAuthService } from "../../domain/interface/auth.service.js";
import { Request, Response } from "express";

export class AuthController {
  constructor(private service: IAuthService) {}

  async register(req: Request, res: Response) {
    try {
      
      const register_progress = await this.service.register(req.body);

      if (!register_progress.success) {
        return res.status(400).json(register_progress);
      }
      return res.status(200).json(register_progress);

    } catch (error) {
      console.error("Register user error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  async login(req: Request, res: Response){
    try {

      const login_progress = await this.service.login(req.body)

      if (!login_progress.success) {
        return res.status(400).json(login_progress);
      }
      return res.status(200).json(login_progress);

    } catch (error) {
      console.error("Login user error:", error);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
