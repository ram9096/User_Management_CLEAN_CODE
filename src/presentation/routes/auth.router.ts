import { Router } from "express";
import { MongoRepository } from "../../infrastructure/repositories/mongo-user.repository.js";
import { AuthService } from "../../application/use_case/auth.usecase.js";
import { AuthController } from "../controller/auth.controller.js";
import { JWTService } from "../../application/use_case/jwt.usecase.js";


const auth_router = Router()

const auth_repository = new MongoRepository()
const token_service = new JWTService()
const auth_service = new AuthService(auth_repository,token_service)
const auth_controller = new AuthController(auth_service)

auth_router.post('/login',(req,res)=>auth_controller.login(req,res))
auth_router.post('/register',(req,res)=>auth_controller.register(req,res))

export default auth_router