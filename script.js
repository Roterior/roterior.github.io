const cnvs = document.getElementById('canvas');
const cntx = canvas.getContext('2d');
const step = 55;
const rows = cnvs.height / step;
const cols = cnvs.width / step;
const speed = 250;
var record = 0;
var snake;
(function setup() {
	snake = new Snake();
	fruit = new Fruit();
	fruit.pickLocation(snake);
	window.setInterval(() => {
		cntx.clearRect(0, 0, cnvs.width, cnvs.height);
		for (var i = 0; i < cnvs.width; i += step) {
			for (var j = 0; j < cnvs.width; j += step) {
				cntx.fillStyle = "rgb(220, 170, 120)";
				if (i % 2 == j % 2) {
					cntx.fillStyle = "rgb(200, 150, 100)";
				}
				cntx.fillRect(i, j, step, step);
			}
		}
		snake.checkCollision();
		snake.update(fruit);
		snake.draw();
		if (snake.eat(fruit)) {
			fruit.pickLocation(snake);
			if (record < snake.total) {
				record = snake.total;
			}
		}
		fruit.draw();
		document.getElementById('controls').innerHTML = `Score: ${snake.total}`;
		document.getElementById('recs').innerHTML = `Record: ${record}`;
	}, speed);
}());
window.addEventListener('keydown', changeDir);
function changeDir(event) {
	var direction = event.key.replace('Arrow', '');
	snake.changeDirection(direction);
}

// Logic of Swipe Touches on Smartphones
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
			// document.getElementById('move').innerHTML += "SWIPED LEFT ";
        } else {
            /* right swipe */
			snake.xSpeed = step * 1;
			snake.ySpeed = 0;
			snake.currentDir = direction;
			// document.getElementById('move').innerHTML += "SWIPED RIGHT ";
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
			snake.xSpeed = 0;
			snake.ySpeed = -step * 1;
			snake.currentDir = direction;
			// document.getElementById('move').innerHTML += "SWIPED UP ";
        } else {
            /* down swipe */
			snake.xSpeed = 0;
			snake.ySpeed = step * 1;
			snake.currentDir = direction;
			// document.getElementById('move').innerHTML += "SWIPED DOWN ";
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
