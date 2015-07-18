var express = require('express');
var bodyParser = require('body-parser');
var students = require('./data.js')

var app = express();

app.use(bodyParser());


app.get('/', function(req, res) {
	res.send("Express Server is running")
})

app.get('/students', function(req, res) {
	res.send(students.getAll());
})

app.get('/students/:id', function(req, res) {
	var id = req.params.id;
	var respond = students.getById(id);
	if (respond === null) {
		res.send(students.error());
	}
	res.send(respond);
})

app.post('/students', function(req, res) {
	var newStudent = req.body.name;
	var grade = req.body.totalGrade;


	if (newStudent == undefined || grade == undefined) {
		res.send(students.error());
	}

	students.add(newStudent, grade);
	res.send(students.success());
})

app.put('/students/:id', function(req, res){
	var id = req.params.id;
	var student = req.body.name;
	var grade = req.body.totalGrade; 
 	
 	if (id == undefined ||student == undefined || grade == undefined) {
		res.send(students.error());
	}

	students.update(id, student, grade);
	res.send(students.success());
})

app.delete('/students/:id', function(req, res) {
	var id = req.params.id;

	if (id == undefined) {
		res.send(students.error());
	}
		
	students.remove(id);
	res.send(students.success());
})

app.listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');