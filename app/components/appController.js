
var BillsApp = angular.module('BillsApp', []);

angular.module('BillsApp')
	.controller('AppCtrl', ['$scope', function($scope){
	 	$scope.bill = {};
	 	$scope.signatureCanvas = {};

	 	$scope.save = function(){
	 		$scope.bill.signatureImage = $scope.signatureCanvas.toDataURL() ;
	 	};
	}]);