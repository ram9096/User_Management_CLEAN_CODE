import { IUserDto } from "../dto/user.dto.js";
import { User } from "../entities/user.entity.js";


export interface IUserRepository{

    create(data:User): Promise<User | null>
    update(id:string,data:Partial<User>):Promise<User | null>
    delete(id:string):Promise<User | null>

    findById(id:string):Promise<User | null>
    findByEmail(email:string):Promise<User | null>
    findAll():Promise<User[]>

}