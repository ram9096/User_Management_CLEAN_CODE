import { IResponse } from "../../domain/dto/response.dto";
import { IUserDto } from "../../domain/dto/user.dto";
import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interface/user.repository";
import { IUserService } from "../../domain/interface/user.service";
import bcrypt from "bcrypt";

export class UserService implements IUserService {
  constructor(private repository: IUserRepository) {}
  
  async update(
    id: string,
    data: Partial<IUserDto>,
  ): Promise<IResponse<User | null>> {
    try {
      const user_exist = await this.repository.findById(id);

      if (!user_exist) {
        return {
          success: false,
          message: "User not found",
          data: [],
        };
      }

      if (data.email) {
        const email_exist = await this.repository.findByEmail(data.email);
        if (email_exist) {
          return {
            success: false,
            message: "Email already exist",
            data: [],
          };
        }
      }
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      const user_update = await this.repository.update(id, data);

      return {
        success: true,
        message: "User updated successfully",
        data: user_update,
      };
    } catch (error) {
      return {
        success: false,
        message: "Server error",
        data: [],
      };
    }
  }

  async delete(id: string): Promise<IResponse<User | null>> {
    try {
      const user_exist = await this.repository.findById(id);

      if (!user_exist) {
        return {
          success: false,
          message: "User not found",
          data: user_exist,
        };
      }

      const user_deletion = await this.repository.delete(id);

      return {
        success: true,
        message: "User deleted",
        data: user_deletion,
      };
    } catch (error) {
      return {
        success: false,
        message: "Server error",
        data: [],
      };
    }
  }

  async findById(id: string): Promise<IResponse<User | null>> {
    try {
      const user_exist = await this.repository.findById(id);

      if (!user_exist) {
        return {
          success: false,
          message: "User not found",
          data: user_exist,
        };
      }

      return {
        success: true,
        message: "User found",
        data: user_exist,
      };
    } catch (error) {
      return {
        success: false,
        message: "Server error",
        data: [],
      };
    }
  }

  async findAll(): Promise<IResponse<User[]>> {
    try {
      const users = await this.repository.findAll();

      return {
        success: true,
        message: "Listing all the users",
        data: users,
      };
    } catch (error) {
      return {
        success: false,
        message: "Server error",
        data: [],
      };
    }
  }
}
