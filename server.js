var express = require('express');
var useragent = require('useragent');

var app = express();
var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
  var userAgent = useragent.parse(req.headers['user-agent']);
  var userIp = req.headers["x-forwarded-for"];

  if (userIp){
    var list = userIp.split(",");
    userIp = list[list.length-1];
  } else {
    userIp = req.connection.remoteAddress;
  }

  res.json({
    ip: userIp,
    "language": req.headers['accept-language'].split(',')[0],
    OS: userAgent.os.family
  });
});

app.listen(port, function(){
  console.log("Listening to port: " + port);
});