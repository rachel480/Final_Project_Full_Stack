require("dotenv").config()

const express=require ("express")
const cors=require("cors")
const mongoose=require("mongoose")
const corsOptions=require("./config/corsOptions")
const connectDB=require('./config/dbConn')

const PORT=process.env.PORT||2001
const app=express()
connectDB()
app.use(cors(corsOptions))
app.use(express.json())

mongoose.connection.once('open',()=>{
    console.log('connected to mongoDB')
    app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)})
})

mongoose.connection.on('error',(err)=>{
    console.log(err)
})

