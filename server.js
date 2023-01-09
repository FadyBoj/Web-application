// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


const port = 8000;

app.listen(port,()=>{

    console.log(`running at local host : ${port}`);
})

app.get('/all',(request,response)=>{
    response.send(projectData);
    console.log("Send to client success");
})


app.post('/postData',(request,response)=>{
    console.log(request.body)

    projectData = {
        temp : request.body.temp,
        date :new Date(request.body.date * 1000),
        feel : request.body.feel
    }

    response.json({
        status : "Send to server success"
    })
})