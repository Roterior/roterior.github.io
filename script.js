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