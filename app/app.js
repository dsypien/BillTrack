angular.module('BillsApp', ['ngRoute']).
	config(['$routeProvider',
	  function($routeProvider) {
	  	'use strict';

	    $routeProvider.
	      when('/bill', {
	        templateUrl: 'Bill.html',
	        controller: 'BillController'
	      }).
	      when('/bills', {
	      	templateUrl: 'AllBills.html',
	      	controller: 'AllBillsController'
	      }).
	      otherwise({
	        redirectTo: '/bill'
	      });
	  }]);