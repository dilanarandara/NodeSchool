//Invoke in strict mode.
'use strict';

var Student = require('mongoose').model('Student');

exports.list = function (req, res, next) {
    Student.find({}, function (err, students) {
        if (err) {
            res.status(500).send();
        }
        return res.json(students);
    });
};

exports.create = function (req, res, next) {
    var student = new Student(req.body);
    
    student.save(function (err) {
        if (err) {
            return res.status(500).send();
        } else {
            res.json(student);
        }
    });
};

exports.read = function (req, res) {
    Student.findById(req.params.id, function (err, student) {
        if (err) {
            return res.status(500).send();
        }

        if (!student) {
            return res.status(404).send();
        }

        return res.json(student);
    });
};

exports.update = function (req, res) {
    Student.findById(req.params.id, function (err, student) {
        if (err) {
            return res.status(500).send();
        }
        if (!student) {
            return res.status(404).send();
        }

        student.firstName = req.body.firstName;
        student.lastName = req.body.lastName;
        student.email = req.body.email;
        student.age = req.body.age;

        student.save(function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send();
            } else {
                res.json(student);
            }
        });
    });
};

exports.delete = function (req, res) {
    Student.remove(req.params.id, function (err) {
        if (err) {
            return res.send(500).send();
        }
        return res.status(204).send();
    });
};

