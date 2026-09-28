import { ICreateUserDto } from "../dto/user.dto";
import { User } from "../entities/user.entity";


export interface IUserRepository{

    create(data:ICreateUserDto): Promise<User | null>
    update(id:string,data:Partial<ICreateUserDto>):Promise<User | null>
    delete(id:string):Promise<void>

    findById(id:string):Promise<User | null>
    findByEmail(email:string):Promise<User | null>
    findAll():Promise<User[]>

}