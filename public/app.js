// Invooke in strict mode.
'use strict';

var app = angular.module('studentapp', ['ngResource', 'ngRoute', 'students']);

// Configure the hashbang URLs using the $locationProvider services 
app.config(['$locationProvider',
	function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);