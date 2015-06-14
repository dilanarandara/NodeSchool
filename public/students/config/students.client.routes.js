// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'students' module routes
angular.module('students').config(['$routeProvider',
	function ($routeProvider) {
        $routeProvider.
		when('/students', {
            templateUrl: 'students/views/list-students.client.view.html'
        }).
		when('/students/create', {
            templateUrl: 'students/views/create-students.client.view.html'
        }).
		when('/students/:id', {
            templateUrl: 'students/views/view-students.client.view.html'
        }).
		when('/students/:id/edit', {
            templateUrl: 'students/views/edit-students.client.view.html'
        });
    }
]); 