angular.module('BillsApp')
	.directive('signaturePad', ['$window',  function($window){
		return{
			restrict: 'E',
			link: function(scope, element){
				scope.sPad={
					width: 400,
					height: 150,
					context : _getContext
				};

				var _pen = {};

				function _getContext(){
					return element.getContext('2d');
				}

				element.bind('mousemove', function(e) {
				  _pen.x = e.pageX;
				  _pen.y = e.pageY;
				});

				element.bind('mousedown', function(e) {
				  scope.sPad.fillRect(_pen.x, _pen.y, 1, 1);
				});
			},			
			require: '^ngModel',
			replace: false,
			template: '<canvas>'
		};
	}]);