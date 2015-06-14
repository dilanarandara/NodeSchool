// Invoke 'strict' JavaScript mode
'use strict';

//Load module dependencies
var students = require('../controllers/student.server.controller');

// Define the routes module' method
module.exports = function (app) {
    // Set up the 'students' base routes 
    app.route('/api/students')
	   .get(students.list)
	   .post(students.create);
    
    // Set up the 'students' parameterized routes
    app.route('/api/students/:id')
	   .get(students.read)
	   .put(students.update)
	   .delete(students.delete);
}