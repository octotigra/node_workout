var http = require('http');
var urlparse = require('url');
var students = require('./data.js');

var server = http.createServer(function (req, res) {

	var url = urlparse.parse(req.url, true);
	
	//the full path
	var urlpathname = url.pathname;
	var argArray = urlpathname.split("/");

	//route hard code
	var studentsPath = argArray[1];
	var idPath = argArray[2];
	var otherPath = argArray[3];

	switch(req.method) {

		
		case "GET": 
			
			if (studentsPath == "students" && idPath != "") {

				if (otherPath == "" || otherPath == undefined) {
					res.end ("GET/students/id ");
					return;
				}	
			}

			if (studentsPath == "students") {
				
				if (idPath == "" || idPath == undefined) {
					res.write( JSON.stringify(students.getAll()));
					res.end();
					return;
				}	

			}
			
			if (studentsPath == "") {
				res.end("Node sever is running");
				return;
			}
			
			res.write( JSON.stringify(students.error()));
			res.end();
			return;
			
			break;
		

		
		case "POST": 
			
			if (studentsPath == "students") {
				
				if (idPath == "" || idPath == undefined) {
					res.end ("POST/ works");
					return;
				}	
			}
			res.write( JSON.stringify(students.error()));
			res.end();
			return;

			break;

		
		
		case "PUT": 

			if (studentsPath == "students" || idPath != "") {
					
					res.end ("PUT/ works");
					return;
					
			}
			res.write( JSON.stringify(students.error()));
			res.end();
			return;

			break;
		
		case "DELETE":

				if (studentsPath == "students" || idPath != "") {
				
					res.end ("DELETE/ works");
					return;	
			}
			res.write( JSON.stringify(students.error()));
			res.end();
			return;

			break;

			
	}

}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');