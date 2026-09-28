import { IResponse } from "../dto/response.dto";
import { ILoginDto, IUserDto } from "../dto/user.dto";
import { User } from "../entities/user.entity";

export interface IAuthService {

  register(data: IUserDto): Promise<IResponse<User>>;
  login(data: ILoginDto): Promise<IResponse<{ user: User; token: string }>>;

}
