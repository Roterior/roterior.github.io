const cnvs = document.getElementById('canvas');
const cntx = canvas.getContext('2d');
const step = 20;
const rows = canvas.height / step;
const cols = canvas.width / step;
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
		fruit.draw();
		snake.update();
		snake.draw();
		if (snake.eat(fruit)) {
			fruit.pickLocation();
		}
		document.getElementById('controls').innerHTML = `<h3>Score: ${snake.total} </h3>`;
	}, 200);
}());
window.addEventListener('keydown', ((event) => {
	const direction = event.key.replace('Arrow', '');
	snake.changeDirection(direction);
}));




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
            document.getElementById('controls').innerHTML += '<div>LEEEEFT</div>';
        } else {
            /* right swipe */
            document.getElementById('controls').innerHTML += '<div>LEEEEFT</div>';
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
            document.getElementById('controls').innerHTML += '<div>LEEEEFT</div>';
        } else { 
            /* down swipe */
            document.getElementById('controls').innerHTML += '<div>LEEEEFT</div>';
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};