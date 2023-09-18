import morgan from 'morgan'
import express from 'express'
import projectRoutes from './routes/project.js'
import userRoutes from './routes/user.js'
import fundraiserRoutes from './routes/fundraiser.js'
import donationRoutes from './routes/donation.js'
import authRoutes from './routes/auth.js'
import notificationRoutes from "./routes/notification.js"
import cookieParser from 'cookie-parser'
import 'dotenv/config'


import mongoose from 'mongoose'

// Create web server
const app = express()
app.use('/api/uploads', express.static('uploads'));

// connet to db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    // Web server listening requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db and Listening at http://localhost:${process.env.PORT}/`)
    })
  })
  .catch((err) => {
    console.log(err)
  })

// Middlewares
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())
app.use('/api/projects', projectRoutes)
app.use('/api/users', userRoutes)
app.use('/api/fundraiser', fundraiserRoutes)
app.use('/api/donations/', donationRoutes)
app.use('/api/auth', authRoutes) 
app.use("/api/notifications", notificationRoutes)

// get user's login time into system
// store it on last-user-login variable
// if user go to notification page, update last-user-login variable with current login time

// now search for projects, there approved time is equal or not past the last-user-login time
// count found project which match this criteria and display them on notification page

// --------------------------------------------------------------------------------------------------------- //

// add last-login-time field in user's table
// when user click logout, update last-login-time field on user's table with current date and time
// when user go to notification page, update last-login-time field on user's table with current date and time

// add approved-time field in project's table
// develop backend api that get date and time from last-login-time field of current login user
// then filter projects whose approved time is same or recent than last-login-time of current user
// finally send the result to requesting client as new projects

// get approved project since current user account is created. then list them on notification page, as notification history
// but make sure the notification number shows new projects
// Also once the client goto notification page make last-login-time to currnet-time and add new project to notification history


