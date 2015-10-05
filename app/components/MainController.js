angular.module('BillsApp')
	.controller('MainController', ['$scope', 'BillsService', function($scope, BillsService){
		'use strict';

		$scope.bills = [];

		function init(){
			BillsService.getAllBills(function(bills){
				$scope.bills = bills;
			});
		}

		init();
	}]);