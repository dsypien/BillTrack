angular.module('BillsApp')
	.controller('AllBillsController', ['$scope', '$http', '$location', 'BillsService', function($scope, $http, $location, BillsService){
		'use strict';

		$scope.openBill = function(bill, event){
			BillsService.setCurrentBill(bill);
			$location.path('/bill/' + bill.id);
			event.stopPropagation();
			event.preventDefault();
		};

		$scope.newBill = function(event){
			BillsService.setCurrentBill(null);
			$location.path('/newbill');
			event.stopPropagation();
			event.preventDefault();
		};

		$scope.deleteBill = function(index, event){
			BillsService.deleteBill($scope.bills[index], function(data){
				$scope.bills = data;
			});

			event.stopPropagation();
			event.preventDefault();
		};

		function init(){
			BillsService.getAllBills(function(data){
				$scope.bills = data;
			});
		}

		init();
	}]);