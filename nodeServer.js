var http = require('http');
var urlparse = require('url');
var qs = require('querystring');
var students = require('./data.js');

var server = http.createServer(function (req, res) {
	var body; //request body

	req.on('data', function(chunk){
		body += chunk.toString();
	})

	var url = urlparse.parse(req.url, true);
	var query = url.parse(req.url,true).query;
	
	//the full path
	var urlpathname = url.pathname;
	var argArray = urlpathname.split("/");

	//route hard code
	var studentsPath = argArray[1];
	var idPath = argArray[2];
	var otherPath = argArray[3];
	

	switch(req.method) {

		
		case "GET": 

		if (studentsPath == "students" && idPath != "" && idPath != undefined) {

			if (otherPath == "" || otherPath == undefined) {

				var respond = students.getById(idPath);

				if (respond === null) {
					res.write(JSON.stringify(students.error()));
					res.end();
					return;
				}

				res.write(JSON.stringify(respond));
				res.end()
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

		req.on('end', function(){
			//remove wierd "undefined"
			var requestStr = body.replace("undefined", "");
			var request = JSON.parse(requestStr);
			
			if (studentsPath == "students") {
				
				if (idPath == "" || idPath == undefined) {
					
					var student = request.name;
					var grade = request.totalGrade; 

					if (student == undefined || grade == undefined) {
						res.write(JSON.stringify(students.error()));
						res.end();
						return;
					}

					students.add(student, grade);
					res.end(JSON.stringify(students.success()));
					return;

				}	
			}
			res.write( JSON.stringify(students.error()) );
			res.end();
			return;
		})

		break;


		
		case "PUT":
		
		req.on('end', function(){
			var requestStr = body.replace("undefined", "");
			var request = JSON.parse(requestStr);

			if (studentsPath == "students" && idPath != "" &&  idPath != undefined) {

				if (otherPath == "" || otherPath == undefined) {
				
					var id = idPath;
					var student = request.name;
					var grade = request.totalGrade; 
 	
 					if (id == undefined ||student == undefined || grade == undefined) {
						res.send(students.error());
					}

					students.update(id, student, grade);
					res.write( JSON.stringify(students.success()) );
					res.end()
					return;
				}	

			}
		res.write( JSON.stringify(students.error()));
		res.end();
		return;
		})
		
		break;
			
		

		case "DELETE":

		if (studentsPath == "students" && idPath != "" &&  idPath != undefined) {

			if (otherPath == "" || otherPath == undefined) {
				students.remove(idPath);
				res.write( JSON.stringify(students.success()) );
				res.write( JSON.stringify(students.getAll()) );
				res.end();
				return;
			}	

		}

		res.write( JSON.stringify(students.error()));
		res.end();
		return;

		break;		
	}

}).listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');