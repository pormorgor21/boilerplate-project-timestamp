// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var app = express();

require('dotenv').config();
const port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const res = require('express/lib/response');
const { parse } = require('dotenv');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", (req, res) => {
    res.json({
      "unix" : new Date().getTime(),
      "utc" : new Date().toUTCString()
    });

  }
);

app.get("/api/:date", (req, res) => {
  let responObj = {}
  let dateString = req.params.date
  let timeStamp
  let timeStampUnix
  let timeStampUTC
  let isNum = /^\d+$/.test(dateString)

  if (isNum){
    timeStamp = new Date(parseInt(dateString))
    timeStampUnix = timeStamp.valueOf()
    timeStampUTC = timeStamp.toUTCString() 
  } else {
    timeStamp = new Date(dateString)
    timeStampUnix = timeStamp.valueOf()
    timeStampUTC = timeStamp.toUTCString()
  }

  if (timeStampUTC == "Invalid Date") {
    responObj["error"] = "Invalid Date"  
    res.json(responObj);

  } else {
    responObj["unix"] = timeStampUnix
    responObj["utc"] = timeStampUTC
    res.json(responObj);
  }

});


// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
