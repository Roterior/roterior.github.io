document.body.innerHTML += '<canvas id="canvas" width="300" height="300"></canvas>';
const cnvs = document.getElementById('canvas');
const cntx = canvas.getContext('2d');
const step = 20;
const rows = canvas.height / step;
const cols = canvas.width / step;
var snake;

(function setup() {
	snake = new Snake();
	fruit = new Fruit();
	fruit.pickLocation();

	window.setInterval(() => {
		cntx.clearRect(0, 0, cnvs.width, cnvs.height);
		fruit.draw();
		snake.update();
		snake.draw();

		if (snake.eat(fruit)) {
			fruit.pickLocation();
		}
	}, 250);
}());

window.addEventListener('keydown', ((event) => {
	const direction = event.key.replace('Arrow', '');
	snake.changeDirection(direction);
}));

// window.onload = function() {
// 	let d = "RIGHT";
// 	let px=py=21;

// 	let draw6corner = () => {
// 		ctx.beginPath();
// 		ctx.moveTo(50,50);
// 		ctx.lineTo(100,50);
// 		ctx.lineTo(130,80);
// 		ctx.lineTo(100,110);
// 		ctx.lineTo(50,110);
// 		ctx.lineTo(20,80);
// 		ctx.fill();
// 	}

// 	let direction = (event) => {
// 		switch (event.keyCode) {
// 			case 37:
// 			d = "LEFT";
// 			px -= step;
// 			break;
// 			case 38:
// 			d = "UP";
// 			py -= step;
// 			break;
// 			case 39:
// 			d = "RIGHT";
// 			px += step;
// 			break;
// 			case 40:
// 			d = "DOWN";
// 			py += step;
// 			break;
// 		}
// 	}

// 	let draw = () => {
// 		ctx.clearRect(0,0, canvas.width,canvas.height);
// 		for (let x = 1; x < 301; x+=step) {
// 			for (let y = 1; y < 301; y+=step) {
// 				ctx.strokeRect(x,y,step,step);
// 			}
// 		}

// 		switch (d) {
// 			case "LEFT":
// 			px -= step;
// 			break;
// 			case "UP":
// 			py -= step;
// 			break;
// 			case "RIGHT":
// 			px += step;
// 			break;
// 			case "DOWN":
// 			py += step;
// 			break;
// 		}
// 		ctx.fillRect(px,py,step,step);

// 	}
// 	setInterval(draw,250);
// 	document.addEventListener("keydown", direction);
// }