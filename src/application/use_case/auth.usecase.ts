import { IResponse } from "../../domain/dto/response.dto";
import { ILoginDto, IUserDto } from "../../domain/dto/user.dto";
import { User } from "../../domain/entities/user.entity";
import { IAuthService } from "../../domain/interface/auth.service";
import { IUserRepository } from "../../domain/interface/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export class AuthService implements IAuthService {
  constructor(private repository: IUserRepository) {}

  async register(data: IUserDto): Promise<IResponse<User>> {
    try {
      const user_exist = await this.repository.findByEmail(data.email);

      if (user_exist) {
        return {
          success: false,
          message: "User already exist",
          data: [],
        };
      }

      const password_hashing = await bcrypt.hash(data.password, 10);

      const user_creation = await this.repository.create({
        ...data,
        password: password_hashing,
      });

      return {
        success: true,
        message: "User created successfully",
        data: user_creation ? user_creation : [],
      };
    } catch (error) {
      return {
        success: false,
        message: "Server error",
        data: [],
      };
    }
  }

  async login(
    data: ILoginDto,
  ): Promise<IResponse<{ user: User; token: string }>> {
    try {
      const user = await this.repository.findByEmail(data.email);

      if (!user) {
        return {
          success: false,
          message: "User not found",
          data: [],
        };
      }

      const password_checking = await bcrypt.compare(data.password,user.password)

      if (!password_checking) {
        return {
          success: false,
          message: "credentials invalid",
          data: [],
        };
      }
    
      const token = jwt.sign(
        {
            id:user.id,
            role:user.role
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn:"1h"
        }
      )
      return {
        success:true,
        message:"Login successfull",
        data:{
            user,
            token
        }
      }
    } catch (error) {
        return {
            success: false,
            message: "Server error",
            data: [],
        };
    }
  }
}
