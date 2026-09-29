import { IResponse } from "../dto/response.dto.js";
import { IUserDto } from "../dto/user.dto.js";
import { User } from "../entities/user.entity.js";


export interface IUserService{

    update(id:string,data:Partial<IUserDto>):Promise<IResponse<User | null>>
    delete(id:string):Promise<IResponse<User | null>>

    findById(id:string):Promise<IResponse<User | null>>
    findAll():Promise<IResponse<User[]>>

}