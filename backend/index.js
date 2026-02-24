import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import commentRoutes from './routes/commentRoutes.js'


dotenv.config()

const app= express()



//middleware
app.use(cookieParser())
app.use(express.json())


//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/post',postRoutes)
app.use('/api/v1/categories', categoryRoutes)
app.use('/api/v1/comments', commentRoutes)

connectDB()

const PORT=8000
app.listen(PORT,()=>{
    console.log('server running on port:'+PORT);
    
})