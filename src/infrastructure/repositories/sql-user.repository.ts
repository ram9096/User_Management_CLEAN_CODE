import { IUserDto } from "../../domain/dto/user.dto.js";
import { User } from "../../domain/entities/user.entity.js";
import { IUserRepository } from "../../domain/interface/user.repository.js";
import { prisma } from "../database/SQL/prisma.config.js";

export class SqlRepository implements IUserRepository {
  async create(data: User): Promise<User | null> {
    const user = await prisma.user.create({ data });
    return {
        ...user,
        role:user.role as "admin" | "user"
    }
  }
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    if(!user) return null

    return {
        ...user,
        role:user.role as "admin" | "user"
    }
  }
  async findByEmail(email: string): Promise<User | null> {
    const user =  await prisma.user.findUnique({ where: { email } });
    if(!user) return null
    return {
        ...user,
        role:user.role as "admin" | "user"
    }
  }
  async findAll(): Promise<User[]> {
    const users =  await prisma.user.findMany()

    return users.map((user)=>({
        ...user,
        role: user.role as "admin" | "user",
    }))
  }
  async update(id: string, data: Partial<User>): Promise<User | null> {
    const user =  await prisma.user.update({
      where: { id },
      data,
    });
    return {
        ...user,
        role:user.role as "admin" | "user"
    }
  }
  async delete(id: string): Promise<User | null> {
      const user = await prisma.user.delete({where:{id}})
      return {
        ...user,
        role:user.role as "admin" | "user"
    }
  }
}
