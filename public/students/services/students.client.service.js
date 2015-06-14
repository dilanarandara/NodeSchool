// Invoke 'strict' JavaScript mode
'user strict';

// Create the 'students' service
angular.module('students').factory('Students', ['$resource', function ($resource) {
        // Use the '$resource' service to return an student '$resource' object
        return $resource('api/students/:id', {
            id: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);