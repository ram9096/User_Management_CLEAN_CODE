import { IResponse } from "../dto/response.dto.js";
import { ILoginDto, IUserDto } from "../dto/user.dto.js";
import { User } from "../entities/user.entity.js";

export interface IAuthService {

  register(data: IUserDto): Promise<IResponse<User>>;
  login(data: ILoginDto): Promise<IResponse<{ user: User; token: string }>>;

}
