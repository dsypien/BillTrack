angular.module('BillsApp')
	.controller('BillController', ['$scope', 'BillsService', '$location', function($scope, BillsService, $location){
		'use strict';

	 	$scope.bill = BillsService.getCurrentBill();
	 	$scope.signatureCanvas = {};

	 	$scope.save = function(){
	 		$scope.bill.signatures = [];
	 		$scope.bill.signatures.push($scope.signatureCanvas.toDataURL());

	 		BillsService.save($scope.bill, function(data){
	 			$scope.bills = data;
	 			$location.path('/allbills');
	 		});
	 	};
	}]);