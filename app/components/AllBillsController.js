angular.module('BillsApp')
	.controller('AllBillsController', ['$scope', '$http', function($scope, $http){
		'use strict';

		$scope.bills = {};

		function init(){
			$http.get('bills').
				success(function(data, status, headers, config){
					$scope.bills = data;
				});
		}

		init();
	}]);