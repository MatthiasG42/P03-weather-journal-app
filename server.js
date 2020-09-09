// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//POST Route, add the Data form the Client to the projectData variable
app.post('/add', addData);

function addData(req,res) {
    projectData['date'] = req.body.date;
    projectData['city'] = req.body.city;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    res.send(projectData);
}

// GET send Data back
app.get('/all', getData)

function getData(req,res){
  res.send(projectData);
  console.log('Data sent from server');
  console.log(projectData.date+projectData.city+projectData.temp+projectData.content)
}

// Setup Server
const port = 8000;
// Spin up Server
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});