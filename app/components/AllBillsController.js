angular.module('BillsApp')
	.controller('AllBillsController', ['$scope', '$http', '$location', function($scope, $http, $location){
		'use strict';

		$scope.bills = {};

		$scope.openBill = function(id){
			console.log('opening bill with id ' + id);
			$location.path('/bill/' + id);
			event.stopPropagation();
		};

		function init(){
			$http.get('bill/all').
				success(function(data, status, headers, config){
					$scope.bills = data;
				});
		}

		init();
	}]);