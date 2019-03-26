function Snake() {
	this.x = step;
	this.y = step;
	this.xSpeed = step * 1;
	this.ySpeed = 0;
	this.total = 0;
	this.tail = [];
	this.currentDir = 'Right';
	this.draw = function() {
		cntx.fillStyle = "#00FF00";
		for (let i = 0; i < this.tail.length; i++) {
			cntx.fillRect(this.tail[i].x, this.tail[i].y, step, step);
		}
		cntx.fillRect(this.x, this.y, step, step);
	}
	this.update = function(fruit) {
		for (let i = 0; i < this.tail.length - 1; i++) {
			this.tail[i] = this.tail[i+1];
		}
		this.tail[this.total - 1] = {x: this.x, y: this.y};
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		this.checkGameOver(fruit);
	}
	this.changeDirection = function(direction) {
		if (direction == 'Up' && this.currentDir != 'Down') {
			this.xSpeed = 0;
			this.ySpeed = -step * 1;
			this.currentDir = direction;
		}
		if (direction == 'Down' && this.currentDir != 'Up') {
			this.xSpeed = 0;
			this.ySpeed = step * 1;
			this.currentDir = direction;
		}
		if (direction == 'Left' && this.currentDir != 'Right') {
			this.xSpeed = -step * 1;
			this.ySpeed = 0;
			this.currentDir = direction;
		}
		if (direction == 'Right' && this.currentDir != 'Left') {
			this.xSpeed = step * 1;
			this.ySpeed = 0;
			this.currentDir = direction;
		}
	}
	this.eat = function(fruit) {
		if (this.x == fruit.x && this.y == fruit.y) {
			this.total++;
			return true;
		}
		return false;
	}
	this.checkGameOver = function(fruit) {
		if (this.x > cnvs.width-10 || this.x < 0 || this.y > cnvs.height-10 || this.y < 0) {
			this.x = step;
			this.y = step;
			this.xSpeed = step * 1;
			this.ySpeed = 0;
			this.total = 0;
			this.tail = [];
			this.currentDir = 'Right';
			fruit.pickLocation();
		}
	}
	document.getElementById('move').innerHTML = "GG ";
	document.addEventListener('touchstart', handleTouchStart, false);        
	document.addEventListener('touchmove', handleTouchMove, false);
	var xDown = null;                                                        
	var yDown = null;
	function getTouches(evt) {
	  return evt.touches ||             // browser API
	         evt.originalEvent.touches; // jQuery
	}                                                     
	function handleTouchStart(evt) {
	    const firstTouch = getTouches(evt)[0];                                      
	    xDown = firstTouch.clientX;                                      
	    yDown = firstTouch.clientY;                                      
	};                                                
	function handleTouchMove(evt) {
	    if ( ! xDown || ! yDown ) {
	        return;
	    }
	    var xUp = evt.touches[0].clientX;                                    
	    var yUp = evt.touches[0].clientY;
	    var xDiff = xDown - xUp;
	    var yDiff = yDown - yUp;
	    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
	        if ( xDiff > 0 ) {
	            /* left swipe */ 
	            this.xSpeed = -step * 1;
				this.ySpeed = 0;
				this.currentDir = direction;
				document.getElementById('move').innerHTML += "SWIPED LEFT ";
	        } else {
	            /* right swipe */
				this.xSpeed = step * 1;
				this.ySpeed = 0;
				this.currentDir = direction;				
				document.getElementById('move').innerHTML += "SWIPED RIGHT ";
	        }                       
	    } else {
	        if ( yDiff > 0 ) {
	            /* up swipe */ 
				this.xSpeed = 0;
				this.ySpeed = -step * 1;
				this.currentDir = direction;				
				document.getElementById('move').innerHTML += "SWIPED UP ";
	        } else { 
	            /* down swipe */
				this.xSpeed = 0;
				this.ySpeed = step * 1;
				this.currentDir = direction;				
				document.getElementById('move').innerHTML += "SWIPED DOWN ";
	        }                                                                 
	    }
	    /* reset values */
	    xDown = null;
	    yDown = null;                                             
	};
}
