'use strict';

var app = require('../../server'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    Student = mongoose.model('Student');

var student;

describe('StudentController unit tests : ', function () {
    beforeEach(function (next) {
        student = new Student({
            firstName : 'Dilan',
            lastName : 'Arandara',
            email : 'dilan.madu@gmail.com',
            age : 27
        });
        
        student.save(function () {
            return next();
        });
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
    
    describe('Testing the Get methods', function () {
        it('Should be able to get the list of students', function (next) {
            request(app)
            .get('/api/students/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                res.body.should.be.an.Array.and.have.lengthOf(1);
                res.body[0].should.have.property('firstName', student.firstName);
                res.body[0].should.have.property('lastName', student.lastName);
                res.body[0].should.have.property('email', student.email);
                res.body[0].should.have.property('age', student.age);
                
                next();
            });
        });
        
        it('Should be able to get specific student', function (next) {
            request(app)
            .get('/api/students/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                res.body.should.be.an.Array.and.have.lengthOf(1);
                res.body[0].should.have.property('firstName', student.firstName);
                res.body[0].should.have.property('lastName', student.lastName);
                res.body[0].should.have.property('email', student.email);
                res.body[0].should.have.property('age', student.age);
                
                next();
            });
        });
    });
});