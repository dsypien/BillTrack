angular.module('BillsApp', ['ngRoute']).
	config(['$routeProvider',
	  function($routeProvider) {
	  	'use strict';

	    $routeProvider.
	      when('/bill/:index', {
	        templateUrl: 'Bill.html',
	        controller: 'BillController'
	      }).
	      when('/allbills', {
	      	templateUrl: 'AllBills.html',
	      	controller: 'AllBillsController'
	      }).
	      otherwise({
	        redirectTo: '/allbills'
	      });
	  }]);