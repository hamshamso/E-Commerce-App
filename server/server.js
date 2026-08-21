import express from "express";
import "dotenv/config";
const app = express()
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000
import authRoute from './routes/authRoute.js'
app.use(express.json());
app.use('/',authRoute)
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        console.log("Database connected")
        app.listen(PORT, () => {
            console.log(`Servere is listning on port ${PORT}`)
        })
    }catch(e){
        console.error(e)
    }

}
start()