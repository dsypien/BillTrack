angular.module('BillsApp')
	.controller('BillController', ['$scope', 'BillsService', '$location', function($scope, BillsService, $location){
		'use strict';

	 	$scope.bill = BillsService.getCurrentBill();
	 	$scope.signatureCanvas = {};

	 	$scope.save = function(){
	 		$scope.bill.snapshots = [];
	 		$scope.bill.snapshots.push($scope.signatureCanvas.toDataURL());

	 		BillsService.save($scope.bill, function(data){
	 			$scope.bills = data;
	 			$location.path('/allbills');
	 		});
	 	};
	}]);