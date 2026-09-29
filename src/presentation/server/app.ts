import express from "express"
import auth_router from "../routes/auth.router.js"
import user_router from "../routes/user.routes.js"
import { connectDB } from "../../infrastructure/database/mongo_db/mongo-db.config.js"
import { AuthMiddlewar } from "../middleware/auth.middleware.js"

const app = express()
await connectDB()

app.use(express.json())

app.use('/auth',auth_router)
app.use('/user',AuthMiddlewar,user_router)

app.listen(5000,()=>{
    console.log(`Listening on port 5000`)
})