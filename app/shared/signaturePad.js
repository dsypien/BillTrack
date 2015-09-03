angular.module('BillsApp')
	.directive('signaturePad', ['$window',  function($window){
		return{
			restrict: 'E',
			link: function(scope, element){
				var _context = element[0].childNodes[0].getContext('2d'),
					_isDrawing = false,
		            _prevX,
		            _prevY;

		         function _init(){
		        	_context.strokeStyle = "#777"; 	
		         }
		        
	            element.bind('touchstart mousedown', function (event) {	            	
	               	_isDrawing = true;

	                _prevX = event.offsetX;
	                _prevY = event.offsetY;	            
	            });

	            element.bind('touchmove mousemove', function (event) {
	                if (_isDrawing) {                    
	                    var curX = event.offsetX;
	                    var curY = event.offsetY;

	                    _draw(_prevX, _prevY, curX, curY);

	                    _prevX = curX;
	                    _prevY = curY;
	                }
	            });

	            element.bind('touchend mouseup', function (event) {
	                _isDrawing = false;
	            });

	            function _draw(pX, pY, cX, cY) {
	                _context.moveTo(pX, pY);
	                _context.lineTo(cX, cY);
	                _context.stroke();
	           	}

			},			
			replace: false,
			template: '<canvas>'
		};
	}]);