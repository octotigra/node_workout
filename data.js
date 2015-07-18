var students = [

	{
		"id": 1,
		"name": "John Doe",
		"totalGrade": 95
	}, 
	{
		"id": 2,
		"name": "Mariam Lindsey",
		"totalGrade": 97
	},

	{
		"id": 3,
		"name": "Rich Cohen",
		"totalGrade":93
	},

	{
		"id": 4,
		"name": "Kathy Watson",
		"totalGrade":90
	},
	{
		"id": 5,
		"name": "Pitt Steward",
		"totalGrade":95
	}	
];

function Student(id, name, totalGrade) {
	this.id = id;
	this.name = name;
	this.totalGrade = totalGrade;

}

exports.getAll = function() {
	return students;
}

exports.getById = function(id) {
	for (s in students) {
		if (students[s].id == id) {
			return students[s];
		}	
	}
	return null;	
}

exports.add = function(name, grade) {

		var previousId = students[students.length- 1].id;
		var id = previousId + 1;

		var entry = new Student(id, name, grade);
		students.push(entry);
}

exports.remove = function(id) {
	for (s in students) {
		if (students[s].id == id) {
             students.splice(s, 1);
              return;
		}
	}	

	return null;		
}

exports.update = function(id, name, grade) {
		for (s in students) {
			if (students[s].id == id) {
             	students[s].name = name;
             	students[s].totalGrade = grade; 
             	return;
             }	
		}
	return null;
}

exports.error = function() {
	return {
		"Error" : "Not found"
	};
}

exports.success = function() {
	return {
		"Status" : "Success"
	};
}