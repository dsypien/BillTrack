angular.module('BillsApp')
	.controller('BillController', ['$scope', 'BillsService', function($scope, BillsService){
		'use strict';

	 	$scope.bill = BillsService.getCurrentBill();
	 	$scope.signatureCanvas = {};

	 	$scope.save = function(){
	 		$scope.bill.signatureImage = $scope.signatureCanvas.toDataURL() ;
	 	};
	}]);