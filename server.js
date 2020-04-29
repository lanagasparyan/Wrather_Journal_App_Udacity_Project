// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express')

/* Dependencies */
const bodyParser = require('body-parser')

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//Post Route
const data = [];

app.post('/add', (req, res) => {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    res.send(projectData);
    console.log(projectData)
})

// Callback function to complete GET '/all'
app.get('/api/projectdata', (req, res) => {
    res.send(JSON.stringify(projectData))
    res.send(JSON.stringify(data))

    console.log(projectData)
    console.log(data)
})

// Setup Server
app.listen(8000, () => {
    console.log('Listening at 8000.')
})