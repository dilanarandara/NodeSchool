'use strict';

var app = require('../../server'),
    should = require('should'),
    mongoose = require('mongoose'),
    Student = mongoose.model('Student');

var student;

describe('Student model unit test', function () {
    
    beforeEach(function (next) {
        student = new Student({
            firstName : 'Dilan',
            lastName : 'Arandara',
            email : 'dilan.madu@gmail.com',
            age : 27
        });
        
        return next();
    });
    
    afterEach(function (next) {
        Student.remove(function (err) {
            if (err) {
                next(err);
                return;
            }
            next();
        });
    });
    
    describe('Testing the save method', function () {
        it('Should be able to save without problems.', function () {
            student.save(function (err) {
                should.not.exists(err);
            });
        });
        
        it('Should not be able to save student without first name.', function () {
            student.firstName = '';
            
            student.save(function (err) {
                should.exists(err);
            });
        });
    });
});