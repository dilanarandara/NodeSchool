// Invoke in strict mode.
'use strict';

angular.module('students')
    .controller('StudentController', ['$scope', '$routeParams', '$location', 'Students', StudentController]);

function StudentController($scope, $routeParams, $location, Students) {
    $scope.list = function () {
        $scope.students = Students.query();
    };
    
    $scope.create = function () {
        var student = new Students({
            firstName : this.firstName, 
            lastName : this.lastName,
            age : this.age,
            email : this.email
        });
        student.$save(function (res) {
            $location.path('students/' + res._id);
        }, function (err) {
            $scope.error = err.data.message;
        });
    };
    
    $scope.findOne = function () {
        $scope.student = Students.get({
            id: $routeParams.id
        });
    };

    $scope.update = function () {
        $scope.student.$update(function (res) {
            $location.path('students/' + $scope.student._id);
        }, function (err) {
            $scope.error = err.data.message;
        });
    };

    $scope.delete = function (student) {
        // If an student was sent to the method, delete it
        if (student) {
            student.$remove(function () {
                for (var i in $scope.students) {
                    if ($scope.students[i] === student) {
                        $scope.students.splice(i, 1);
                    }
                }
            });
        } else {
            $scope.student.$remove(function () {
                $location.path('students');
            });
        }
    };
}