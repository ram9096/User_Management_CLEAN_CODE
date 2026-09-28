import { IUserDto } from "../dto/user.dto";
import { User } from "../entities/user.entity";


export interface IUserRepository{

    create(data:IUserDto): Promise<User | null>
    update(id:string,data:Partial<IUserDto>):Promise<User | null>
    delete(id:string):Promise<User | null>

    findById(id:string):Promise<User | null>
    findByEmail(email:string):Promise<User | null>
    findAll():Promise<User[]>

}