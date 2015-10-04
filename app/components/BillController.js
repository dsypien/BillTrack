angular.module('BillsApp')
	.controller('BillController', ['$scope', 'BillsService', '$location', function($scope, BillsService, $location){
		'use strict';

	 	$scope.bill = BillsService.getCurrentBill();
	 	$scope.signatureCanvas = {};

	 	$scope.save = function(){
	 		$scope.bill.signatureImage = $scope.signatureCanvas.toDataURL();

	 		BillsService.save($scope.bill, function(){
	 			$location.path('/allbills');
	 		});
	 	};
	}]);