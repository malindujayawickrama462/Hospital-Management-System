//importing the Express framework into your project.
// Importing body-parser middleware to handle JSON request bodies
//import ODM library to interact with mongodb
//import dtenv to store sensitive data
//import userRoutes
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userRouter from './routes/userRoutes.js';

//load environment variables
dotenv.config()

//this creates web server
const app = express();

// Middleware to parse incoming JSON requests
// This allows your server to read and understand JSON data sent in the request body
app.use(bodyParser.json());

//connect to mongodb
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to the database")
}).catch(()=>{
    console.log("connection failed")
})

app.use("/users",userRouter)

// Starting the server and making it listen on port 3001
// Once the server is running, it will log a message to the console
app.listen(process.env.PORT,()=>{
    console.log('Server running on port 3001')
});