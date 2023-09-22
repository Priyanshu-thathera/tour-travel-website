import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import  cors  from 'cors'
import cookieParser from 'cookie-parser'

import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import bookingRoute from './routes/booking.js'

dotenv.config()
const app = express()

const corsOptions = {
  origin:'https://priyanshu-tour-service.netlify.app',
  credentials:true
}

// database connection
mongoose
  .connect(process.env.MONGODB_URL)
  // .connect('mongodb://127.0.0.1:27017/mydatabase')
  .then(() => {
    console.log("connected successfully to database");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser());


app.use('/api/v1/auth',authRoute) // for login, logout and register
app.use('/api/v1/tours',tourRoute) // for update and create tours
app.use('/api/v1/users',userRoute) // for update user details
app.use('/api/v1/review',reviewRoute) // for review
app.use('/api/v1/booking',bookingRoute) // for booking

app.listen(7070,()=>{
    console.log("server started on port 7070")
})
