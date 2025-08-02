//importing the Express framework into your project.
import express from 'express';
import bodyParser from 'body-parser';

//this creates web server
let app = express();

app.use(bodyParser.json());

// Starting the server and making it listen on port 3001
// Once the server is running, it will log a message to the console
app.listen(3001,()=>{
    console.log('Server running on port 3001')
});