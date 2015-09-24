
var BillsApp = angular.module('BillsApp', ['ngRoute']);

BillsApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/bill', {
        templateUrl: 'partials/bill.html',
        controller: 'AppCtrl'
      }).
      otherwise({
        redirectTo: '/bill'
      });
  }]);

angular.module('BillsApp')
	.controller('AppCtrl', ['$scope', function($scope){
	 	$scope.bill = {};
	 	$scope.signatureCanvas = {};

	 	$scope.save = function(){
	 		$scope.bill.signatureImage = $scope.signatureCanvas.toDataURL() ;
	 	};
	}]);