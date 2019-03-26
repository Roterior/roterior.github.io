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
}
