
var BillsApp = angular.module('BillsApp', []);

angular.module('BillsApp')
	.controller('AppCtrl', ['$scope', function($scope){
	 	$scope.bill = {

	 	};

	 	$scope.save = function(){
	 		console.log($scope.bill.sigPad.toDataURL());
	 	};
	}]);