require("dotenv").config()
const mongoose=require("mongoose")
const connectDB=require('./config/dbConn')
const createInitialAdmin=require('./Admin/CreateInitialAdmin')

const express=require ("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const insertData=require('./insertData/inserData')

const PORT=process.env.PORT||2001
const app=express()

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/auth',require('./routes/authRoutes'))
app.use('/api/user',require('./routes/userRoutes'))
app.use('/api/category',require('./routes/categoryRoutes'))
app.use('/api/challenge',require('./routes/challengeRoute'))
app.use('/api/course',require('./routes/courseRoutes'))
app.use('/api/question',require('./routes/questionsRoutes'))
app.use('/api/word',require('./routes/wordRoutes'))
app.use('/api/recommendion',require('./routes/recommendionRoutes'))
app.use('/api/userProgress',require('./routes/userProgressRoutes'))
app.use('/api/favoriteWord',require('./routes/favoriteWordRoute'))
app.use('/api/myWord',require('./routes/myWordRoutes'))
app.use('/api/myCategory',require('./routes/myCategoryRoutes'))
app.use("/api/contact", require('./routes/contactMessageRoute'))
connectDB()

mongoose.connection.once('open',async()=>{
    console.log('connected successfuly to DB')
    app.listen(PORT,()=>{console.log(`server is running on port ${PORT}`)})
    //create words
    await insertData.insertWords()
    //create questions
    await insertData.insertQuestions()
    //create challenges
    await insertData.insertChallenges()
    //create courses
    await insertData.insertCourses()
    //create categories
    await insertData.insertCategories()
    //create admin user
    await createInitialAdmin()
})

mongoose.connection.on("error",(err)=>{
    console.log(err)
})

