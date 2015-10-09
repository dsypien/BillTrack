angular.module('BillsApp')
	.controller('BillController', ['$scope', 'BillsService', '$location', '$routeParams', function($scope, BillsService, $location, $routeParams){
		'use strict';

	 	$scope.signatureCanvas = {};

	 	$scope.save = function(){
	 		$scope.bill.signatures = [];
	 		$scope.bill.signatures.push($scope.signatureCanvas.toDataURL());

	 		BillsService.save($scope.bill, function(data){
	 			$scope.bills = data;
	 			$location.path('/allbills');
	 		});
	 	};

	 	function _init(){
	 		BillsService.getBill($routeParams.id, function(data){
	 			$scope.bill = data;
	 		});
	 	}

	 	_init();
	}]);