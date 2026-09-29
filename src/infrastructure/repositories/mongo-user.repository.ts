import { IUserDto } from "../../domain/dto/user.dto.js";
import { User } from "../../domain/entities/user.entity.js";
import { IUserRepository } from "../../domain/interface/user.repository.js";
import { user_model } from "../database/mongo_db/mongo-db.model.js";


export class MongoRepository implements IUserRepository{

    async create(data: IUserDto): Promise<User | null> {
        const user_data = await user_model.create(data)
        return user_data.toObject()
    }   
    async findById(id: string): Promise<User | null> {
        return await user_model.findById(id)
    }
    async findAll(): Promise<User[]> {
        return await user_model.find()
    }
    async findByEmail(email: string): Promise<User | null> {
        return await user_model.findOne({email})
    }
    async update(id: string, data: Partial<IUserDto>): Promise<User | null> {
        return user_model.findByIdAndUpdate(id,data)
    }
    async delete(id: string): Promise<User | null> {
        return user_model.findByIdAndDelete(id)
    }

}