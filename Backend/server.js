//importing the Express framework into your project.
// Importing body-parser middleware to handle JSON request bodies
import express from 'express';
import bodyParser from 'body-parser';

//this creates web server
let app = express();

// Middleware to parse incoming JSON requests
// This allows your server to read and understand JSON data sent in the request body
app.use(bodyParser.json());

// Starting the server and making it listen on port 3001
// Once the server is running, it will log a message to the console
app.listen(3001,()=>{
    console.log('Server running on port 3001')
});