var restify = require('restify')
var fs = require('fs');

var server = restify.createServer()
server.use(restify.bodyParser());
server.pre(restify.CORS());


server.post('/', function(req, res, next) {
  var filename = req.files.data.name
  var tempfilePath = req.files.data.path

  var source = fs.createReadStream(tempfilePath);
  var dest = fs.createWriteStream("uploads/" + filename);

  dest.on("error", function() {
    res.send(500);
    return next();
  });

  dest.on("close", function(ex) {
    res.send(201);
    return next();
  });

  source.pipe(dest);
});


server.listen(8080)