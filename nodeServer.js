var http = require('http');
var url = require('url');
var students = require('./data.js');


//create server
var server = http.createServer(function (req, res) {
  res.end('Test Node Server\n');
  

  //
  console.log(req.method);

  //
  urlParse = url.parse(req.url, true);

	console.log(urlParse);





}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');


//find out method







	


