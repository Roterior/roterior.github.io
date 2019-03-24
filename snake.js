function Snake() {
	this.x = 0;
	this.y = 0;
	this.xSpeed = step * 1;
	this.ySpeed = 0;
	this.total = 0;
	this.tail = [];

	this.draw = function() {
		cntx.fillStyle = "#00FF00";

		for (let i = 0; i < this.tail.length; i++) {
			cntx.fillRect(this.tail[i].x, this.tail[i].y, step, step);
		}

		cntx.fillRect(this.x, this.y, step, step);
	}

	this.update = function() {
		for (let i = 0; i < this.tail.length - 1; i++) {
			this.tail[i] = this.tail[i+1];
		}

		this.tail[this.total - 1] = {x: this.x, y: this.y};

		this.x += this.xSpeed;
		this.y += this.ySpeed;

		if (this.x > cnvs.width) this.x = 0;
		if (this.x < 0) this.x = cnvs.width;
		if (this.y > cnvs.height) this.y = 0;
		if (this.y < 0) this.y = cnvs.height;
	}

	this.changeDirection = function(direction) {
		switch(direction) {
			case 'Up':
				this.xSpeed = 0;
				this.ySpeed = -step * 1;
				break;
			case 'Down':
				this.xSpeed = 0;
				this.ySpeed = step * 1;
				break;			
			case 'Left':
				this.xSpeed = -step * 1;
				this.ySpeed = 0;
				break;			
			case 'Right':
				this.xSpeed = step * 1;
				this.ySpeed = 0;
				break;
		}
	}

	this.eat = function(fruit) {
		if (this.x == fruit.x && this.y == fruit.y) {
			this.total++;
			return true;
		}
		return false;
	}
}