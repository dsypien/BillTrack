angular.module('BillsApp')
	.controller('AllBillsController', ['$scope', '$http', '$location', 'BillsService', function($scope, $http, $location, BillsService){
		'use strict';

		$scope.openBill = function(bill){
			BillsService.setCurrentBill(bill);
			$location.path('/bill/' + bill.id);
			event.stopPropagation();
		};

		function init(){
			BillsService.getAllBills(function(bills){
				$scope.bills = bills;
			});
		}

		init();

	}]);