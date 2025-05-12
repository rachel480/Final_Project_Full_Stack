require("dotenv").config()

const express=require ("express")
const cors=require("cors")
const mongoose=require("mongoose")
const corsOptions=require("./config/corsOptions")
const connectDB=require('./config/dbConn')
const createInitialAdmin=require('./Admin/CreateInitialAdmin')
const insertData=require('./insertData/insertData')

const PORT=process.env.PORT||2001
const app=express()
connectDB()
app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/auth',require('./routes/authRouters'))
app.use('/api/user',require('./routes/userRoute'))
app.use('/api/category',require('./routes/categoryRoute'))
app.use('/api/challenge',require('./routes/challengeRoute'))
app.use('/api/course',require('./routes/courseRouter'))
app.use('/api/question',require('./routes/questionRouter'))
// app.use('/api/recommendation',require('./routes/RecommendationRouter'))
app.use('/api/word',require('./routes/wordRouters'))
mongoose.connection.once('open',async()=>{
    console.log('connected to mongoDB')
    app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)})
    //creat admin user
    await createInitialAdmin()
    //create words
    await insertData.insertWord()
    //create questions
   await insertData.insertQuestions()
   //create challenges
   await insertData.insertChallenges()
   //creat categories
   await insertData.insertCategories()
})

mongoose.connection.on('error',(err)=>{
    console.log(err)
})

