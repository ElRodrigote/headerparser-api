var server = require('express');
var useragent = require('useragent');

var app = server();
var port = process.env.PORT || 3500;

app.get('/', function(req, res) {
  var visitorAgent = useragent.parse(req.headers['user-agent']);
  var visitorIp = req.headers["x-forwarded-for"];

  if (visitorIp){
    var list = visitorIp.split(",");
    visitorIp = list[list.length-1];
  } else {
    visitorIp = req.connection.remoteAddress;
  }

  res.json({
    "ip": visitorIp,
    "lang": req.headers['accept-language'].split(',')[0],
    "os": visitorAgent.os.family
  });
});

app.listen(port, function(){
  console.log("Listening to port: " + port);
});