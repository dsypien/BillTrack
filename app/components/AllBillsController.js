angular.module('BillsApp')
	.controller('AllBillsController', ['$scope', '$http', '$location', 'BillsService', function($scope, $http, $location, BillsService){
		'use strict';

		$scope.openBill = function(id){
			console.log('opening bill with id ' + id);
			$location.path('/bill');
			event.stopPropagation();
		};

		function init(){
			BillsService.getAllBills(function(bills){
				$scope.bills = bills;
			});
		}

		init();

	}]);