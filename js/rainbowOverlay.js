
var rainbowOverlay = function(){
	this.canvasElem = {};
	this.clearBtn = {};

	var self = this;
	/* Inits the overlay
	 * @param 
	 * @returns
	*/
	self.init = function(){
		self.canvasElem = document.getElementById('rainbowCanvas');
		//ensure tha canvas exists
		if (!self.canvasElem){
			var elem = document.createElement('div');
			elem.className = 'rainbowCanvas';
			document.body.appendChild(elem);
			self.canvasElem = elem;
		}
		self.canvasElem.height = self.canvasElem.clientHeight;
		self.canvasElem.width = self.canvasElem.clientWidth;
		self.canvasElem.addEventListener('mousedown', function( event ){
			var coords = self.getCursorLocation(this, event);
			self.drawRainbow(coords.x, coords.y);

		});
	}
	/* Draws an arch
	 * @param 
	 *		- context : canvas context
	 *		- color : color to draw
	 *		- x : x position
	 *		- y : y position
	 *		- radius : radius of arc 
	 * @returns
	*/
	self.arch = function(context, color, x, y, radius){
		context.strokeStyle = color;
		context.beginPath();
		context.arc(x, y, radius, Math.PI, 2*Math.PI, false);
		context.stroke();
	}
	/* Gets the moust location when an event occurs
	 * @param 
	 *		- canvas : the current target
	 *		- color : event of the click event
	 * @returns 
	 *		- data : x and y position of cursor
	*/
	self.getCursorLocation = function(canvas, event){
		var rect = canvas.getBoundingClientRect();
		var x = event.clientX - rect.left;
		var y = event.clientY - rect.top;
		return {x: x, y: y};
	}
	/* Returns an hsla color string based on hue, saturation, lightness and alpha
	 * @param 
	 *		- hue
	 *		- saturation
	 *		- lightness
	 *		- alpha 
	 * @returns
	 *		- combination value of HSLA color
	*/
	self.hslaColor = function(hue,saturation,lightness,alpha){
	  	return 'hsla(' + hue + ',' + saturation + '%,' + lightness + '%,' + alpha + ')';
	}
	/* Draws a rainbow at fixed location
	 * @param 
	 *		- startX : beginning location ot draw (far left)
	 *		- startY : beginning location to draw (far bottom)
	 * @returns
	*/
	self.drawRainbow = function(startX, startY){
		var width = startX,
			height = startY,
			thickness = 10,
			particles = [],
			particleMax = 100,
			ctx = self.canvasElem.getContext('2d');

			//outerRadius modifies the size 
		var outerRadius = 200*.45,
			innerRadius = outerRadius + thickness;

		for (var i = 0; i < thickness; ++i) {
			var ratio = i/thickness,
			 	hue = Math.floor(360*ratio*ratio),
				sat = 100,
				light = 50,
				alpha = Math.sin(Math.PI*ratio) * 0.75;

			self.arch(ctx, self.hslaColor(hue,sat,light, alpha), width, height,outerRadius-i);
		}
	}
}
