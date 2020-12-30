
const port = 3000;
projectData = {};
// define express to run server and routes
const express = require('express');
// inctance from express
const app = express();
//include cors
const cors = require('cors');
app.use(cors());
// include bodyparser
const bodyParser = require('body-parser');
const { request } = require('http');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('website'));
//get route/////////////////////////////////
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
  console.log("server:got home request");
});////////////////////////////////////////

app.get('/all', getData);
function getData(req, res) {
  console.log("server:returning project data to api")
  console.log(projectData)
  res.send(projectData);
}

//post route////////////////////////////
app.post('/add', adddata);
function adddata(req, res) {
console.log("server:Post add Request ProjectData ");
projectData['date'] = req.body.date;
projectData['temp'] = req.body.temp;
projectData['content'] = req.body.content;
console.log("server:Post add Request ProjectData " + projectData);
res.send(projectData);
}

//start the server//////////////////////////
const server = app.listen(port, listening);
function listening() {
  console.log('server running');
  console.log('server:running on localhost:'+ port + " Server Address ");
  };//////////////////////////////
  