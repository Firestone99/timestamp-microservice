// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/1451001600000", (req,res) => {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

// // API endpoint for handling dates
app.get("/api/:date?", function (req, res) {
  let inputDate = req.params.date;
  let date;
  
  if (!inputDate) {
    date = new Date();
  } else {
    // Try parsing the input date
    date = new Date(inputDate);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
  }
  
  // Return JSON object with unix and utc keys
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
