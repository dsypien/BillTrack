angular.module('BillsApp')
	.directive('signaturePad', ['$window',  function($window){
		function _controller($scope, $element){
			var _canvas = $element[0].childNodes[0];
			var _context = _canvas.getContext('2d'),
				_isDrawing = false,
	            _prevX,
	            _prevY,
	            _prevCoords = [],
	            _mouseMoves = 0;

	         function _init(){
	        	_context.strokeStyle = "#777"; 	
	         }
	        
            $element.bind('touchstart mousedown', function (event) {	            	
               	_isDrawing = true;

                _prevX = event.offsetX;
                _prevY = event.offsetY;	            
            });

            $element.bind('touchmove mousemove', function (event) {
                if (_isDrawing) {                    
                    var curX = event.offsetX;
                    var curY = event.offsetY;
                    _mouseMoves++;

                    _draw(_prevX, _prevY, curX, curY);

                    _prevX = curX;
                    _prevY = curY;
                }
            });

            $element.bind('touchend mouseup', function (event) {
                _isDrawing = false;
                _prevCoords = [];
            });

            function _draw(pX, pY, cX, cY) {
            	_prevCoords.push({x: cX, y: cY});

            	if(_prevCoords.length > 2){
            		_context.moveTo(_prevCoords[0].x, _prevCoords[0].y);
            		_context.bezierCurveTo(
            			_prevCoords[0].x, 
            			_prevCoords[0].y, 
            			_prevCoords[1].x, 
            			_prevCoords[1].y, 
            			_prevCoords[2].x, 
            			_prevCoords[2].y);
					_context.stroke();

					_prevCoords.splice(0, 2);
            	}
                // _context.moveTo(pX, pY);
                // _context.lineTo(cX, cY);
                // _context.stroke();
           	}

           	$scope.clear = function(){
           		_context.clearRect(0, 0, _canvas.width, _canvas.height);
           		_prevCoords = [];
           	};
		}

		return{
			restrict: 'E',
			controller: _controller,			
			scope: {
            	ngModel: '='
        	},
			replace: false,
			template: '<canvas width=500 height=200></canvas><input type="button" class="btn btn-default" ng-click="clear()" value="Clear">'
		};
	}]);