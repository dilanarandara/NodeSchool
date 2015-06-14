describe('Testing StudentController.', function () {
    var _scope, StudentController;
    
    beforeEach(function () {
        module('studentapp');
        
        jasmine.addMatchers({
            toEqualData: function (util, customEqualityTesters) {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: angular.equals(actual, expected)
                        };
                    }
                };
            }
        });
        
        inject(function ($rootScope, $controller) {
            _scope = $rootScope.$new();
            StudentController = $controller('StudentController', {
                $scope : _scope
            })
        });
    });
    
    it('Should have a find method that uses $resource to retrive a list of students.',
        inject(function (Students) {
        inject(function ($httpBackend) {
            var sampleStudent = new Students({
                firstName : 'Dilan', 
                lastName : 'Arandara',
                age : 27,
                email : 'dilan.madu@gmail.com'
            });
            
            var sampleStudents = [sampleStudent];
            
            $httpBackend.expectGET('api/students').respond(sampleStudents);
            
            _scope.list();
            $httpBackend.flush();
            expect(_scope.students).toEqualData(sampleStudents);
        });
    }));
    
    it('Should have find one method that uses $resource to receive a single of Student', inject(function (Students) {
        inject(function ($httpBackend, $routeParams) {
            var sampleStudent = new Students({
                firstName : 'Dilan', 
                lastName : 'Arandara',
                age : 27,
                email : 'dilan.madu@gmail.com'
            });
            
            $routeParams.id = 'abcdef123456789012345678';
            $httpBackend.expectGET(/api\/articles\/([0-9a-fA-F]{24})$/).respond(sampleStudent);
            _scope.findOne();
            $httpBackend.flush();
            expect(_scope.student).toEqualData(sampleStudent);
        });
    }));
});