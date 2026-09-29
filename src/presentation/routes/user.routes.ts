import { Router } from "express";
import { UserService } from "../../application/use_case/user.usecase.js";
import { MongoRepository } from "../../infrastructure/repositories/mongo-user.repository.js";
import { UserController } from "../controller/user.controller.js";
import { RoleMiddleware } from "../middleware/role.middleware.js";

const user_router = Router() 
const user_repository = new MongoRepository()
const user_service = new UserService(user_repository)
const user_controller = new UserController(user_service)


user_router.get('/',RoleMiddleware("admin"),user_controller.findAll)
user_router.get('/:id',user_controller.findById)
user_router.patch('/:id',user_controller.updateUser)
user_router.delete('/:id',user_controller.deleteUser)

export default user_router

