const cnvs = document.getElementById('canvas');
const cntx = canvas.getContext('2d');
const step = 50;
const rows = canvas.height / step;
const cols = canvas.width / step;
cnvs.width = 600;
cnvs.height = 600;
(function setup() {
	snake = new Snake();
	fruit = new Fruit();
	fruit.pickLocation();
	window.setInterval(() => {
		cntx.clearRect(0, 0, cnvs.width, cnvs.height);
		for (let i = 0; i < cnvs.width; i += step) {
			for (let j = 0; j < cnvs.width; j += step) {
				cntx.strokeRect(i, j, step, step);
			}
		}
		snake.update(fruit);
		snake.draw();
		if (snake.eat(fruit)) {
			fruit.pickLocation();
		}
		fruit.draw();
		document.getElementById('controls').innerHTML = `Score: ${snake.total}`;

	}, 200);

}());
window.addEventListener('keydown', ((event) => {
	const direction = event.key.replace('Arrow', '');
	snake.changeDirection(direction);
}));

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
            snake.xSpeed = -step * 1;
			snake.ySpeed = 0;
			snake.currentDir = direction;
			document.getElementById('move').innerHTML += "SWIPED LEFT ";
        } else {
            /* right swipe */
			snake.xSpeed = step * 1;
			snake.ySpeed = 0;
			snake.currentDir = direction;				
			document.getElementById('move').innerHTML += "SWIPED RIGHT ";
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
			snake.xSpeed = 0;
			snake.ySpeed = -step * 1;
			snake.currentDir = direction;				
			document.getElementById('move').innerHTML += "SWIPED UP ";
        } else { 
            /* down swipe */
			snake.xSpeed = 0;
			snake.ySpeed = step * 1;
			snake.currentDir = direction;				
			document.getElementById('move').innerHTML += "SWIPED DOWN ";
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};