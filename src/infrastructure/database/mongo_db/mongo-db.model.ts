

import mongoose, { Schema } from "mongoose";
import { User } from "../../../domain/entities/user.entity";

const user_schema = new Schema<User>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ["admin", "user"],
        default:"user"
    }
},{timestamps:true})

export const user_model = mongoose.model("User",user_schema)