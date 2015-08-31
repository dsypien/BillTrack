'use strict';

angular.module('BillsApp', ['ngMaterial'])
	.directive('signaturePad', function(){
		function controller($scope, $element){
			$scope.sPad={
				width: 400,
				height: 150,
				context : _getContext
			};

			var _pen = {};

			function _getContext(){
				return $element.getContext('2d');
			};

			$element.addEventListener('mousemove', function(e) {
			  _pen.x = e.pageX;
			  _pen.y = e.pageY;
			});

			$element.addEventListener('mousedown', function(e) {
			  $scope.sPad.fillRect(_pen.x, _pen.y, 1, 1);
			});
		}

		return{
			restrict: 'E',
			controller: controller,
			replace: true,
			scope: {
            	ngModel: '='
        	},
			template: '<canvas width="{{sPad.width}}" height="{{sPad.height}}">'
		};
	});