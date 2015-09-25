angular.module('BillsApp')
	.controller('BillController', ['$scope', function($scope){
		'use strict';

	 	$scope.bill = {};
	 	$scope.signatureCanvas = {};

	 	$scope.save = function(){
	 		$scope.bill.signatureImage = $scope.signatureCanvas.toDataURL() ;
	 	};
	}]);