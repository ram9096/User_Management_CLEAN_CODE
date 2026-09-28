import { IResponse } from "../dto/response.dto";
import { IUserDto } from "../dto/user.dto";
import { User } from "../entities/user.entity";


export interface IUserService{

    update(id:string,data:Partial<IUserDto>):Promise<IResponse<User | null>>
    delete(id:string):Promise<IResponse<User | null>>

    findById(id:string):Promise<IResponse<User | null>>
    findAll():Promise<IResponse<User[]>>

}