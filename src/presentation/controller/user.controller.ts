import { IUserService } from "../../domain/interface/user.service.js";
import { Request, Response } from "express";

export class UserController {
  constructor(private service: IUserService) {}

  async findById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      const data = await this.service.findById(id);

      if (!data.success) {
        return res.status(404).json(data);
      }
      return res.status(200).json(data);
    } catch (error) {
        console.error("Fetch user error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
  }
  async findAll(req: Request, res: Response) {
    try {
      const data = await this.service.findAll();

      return res.status(200).json(data);
    } catch (error) {
        console.error("Fetch user error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const update_progress = await this.service.update(id, req.body);

      if (!update_progress.success) {
        return res.status(404).json(update_progress);
      }
      return res.status(200).json(update_progress);
    } catch (error) {
        console.error("Update user error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id as string;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }

      const delete_progress = await this.service.delete(id);

      if (!delete_progress.success) {
        return res.status(404).json(delete_progress);
      }
      return res.status(200).json(delete_progress);
    } catch (error) {
        console.error("Delete user error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
  }
}
