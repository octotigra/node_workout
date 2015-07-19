var http = require('http');
var urlparse = require('url');
var qs = require('querystring');
var students = require('./data.js');

var server = http.createServer(function (req, res) {
	var body; //request body

	req.on('data', function(chunk){
		body += chunk.toString();
	})

	req.on('end', function(chunk){
		//remove wierd "undefined"
		var requestStr = body.replace("undefined", "");
		var request = JSON.parse(requestStr);
		res.end(request.name);
		return;
	})	

//	res.end("Error");
}).listen(8080, '127.0.0.1');