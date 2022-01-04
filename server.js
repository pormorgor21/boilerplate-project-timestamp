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

app.get("/api/", 
  (req, res) => {
    var unix = new Date().getTime();
    var utc = new Date().toUTCString();

    res.json({
      "unix" : unix,
      "utc" : utc
    });

  }
);

app.get("/api/:date", 
  (req, res) => {
    var strDate = req.params.date;

    var unix = new Date(strDate).getTime();
    var utc = new Date(strDate).toUTCString();

    if (unix == null) {
      res.json({
        "unix" : unix,
        "utc" : utc
      });
    }
    else {
      res.json({
        "error" : "Invalid Date"
      });
    }
    
  }
);



// listen for requests :)
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
