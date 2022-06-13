

const express = require('express'); //Uses express module
const morgan = require('morgan');
const https = require('https');
const fs = require('fs');

const db = require('./queries') //SET db queries
const app =express();
const PORT = 3030; //Listen Port




//Settings
app.set('port', process.env.PORT || PORT);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));//data from froms supported
app.use(express.json());// JSON file supported
//app.use(morgan('combined'));


// routes

// Measures
app.get('/api/dev/measures', db.getMeasures)
app.post('/api/newMeasure', db.insertMeasure)
app.get('/api/datapar', db.getDataPar)
app.post('/api/newDatapar', db.insertDataPar)


app.get('/status', (req, res) => {
    res.status(200).json("Ok saved succesful!");
});

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});



