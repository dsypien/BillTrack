
var BillsApp = angular.module('BillsApp', []);

angular.module('BillsApp')
	.controller('AppCtrl', ['$scope', function($scope){
	 	$scope.bill = {};
	 	$scope.sigPad = {width: 400, height: 200};
	}]);