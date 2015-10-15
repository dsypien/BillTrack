angular.module('BillsApp')
	.directive('signaturePad', ['$window',  function($window){
		function _controller($scope, $element){
			var _canvas = $element[0].childNodes[0],
			    _context = _canvas.getContext('2d'),
				_isDrawing = false,
	            _prevX,
	            _prevY,
	            _prevCoords = [],
	            _mouseMoves = 0;

	        $scope.signatureCanvas = _canvas;

	        function _init(){
	        	_context.strokeStyle = "#777"; 
                _context.lineWidth = 5;
                _drawSignature();
	        }

            $scope.$watch("bill", function(newValue, oldValue){
                _drawSignature();
            });

            function _drawSignature(){
                if($scope.bill){
                    var signature = JSON.parse($scope.bill).signatures ? JSON.parse($scope.bill).signatures[0] : null;

                    if(signature){
                        var img = new Image();

                        img.onload = function(){
                            _context.drawImage(img,0,0); 
                        };

                        img.src = signature;
                    }
                }
            }

            $element.bind('touchstart mousedown', function (event) {	            	
               	_isDrawing = true;

                if(event.offsetX){
                    _prevX = event.offsetX;
                    _prevY = event.offsetY;             
                }
                else{
                    _prevX = event.touches[0].clientX;
                    _prevY = event.touches[0].clientY;
                }
            });

            $element.bind('touchmove mousemove', function (event) {
                if (_isDrawing) {                    
                    var curX= event.offsetX;
                    var curY = event.offsetY;

                    if(event.offsetX){
                        curX= event.offsetX;
                        curY = event.offsetY;
                    }
                    else{
                        curX = event.touches[0].clientX;
                        curY = event.touches[0].clientY;
                    }

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

					console.log("drawing points " + 
						_prevCoords[0].x + " " +
            			_prevCoords[0].y + " " +
            			_prevCoords[1].x + " " +
            			_prevCoords[1].y + " " +
            			_prevCoords[2].x + " " +
            			_prevCoords[2].y );

					_prevCoords.splice(0, 2);
            	}
           	}

            _init();
		}

		return{
			restrict: 'E',
			controller: _controller,	
			scope: {
				signatureCanvas : '=ngModel',
                bill: '@'
			},
        	require: 'ngModel',
			replace: false,
			templateUrl: 'signaturePad.html'
		};
	}]);