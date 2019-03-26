function Fruit() {
	this.x;
	this.y;
	this.pickLocation = function() {
		this.x = (Math.floor(Math.random() * rows - 1) + 1) * step;
		this.y = (Math.floor(Math.random() * cols - 1) + 1) * step;
	}
	this.draw = function() {
		cntx.fillStyle = "#FF0000";
		cntx.fillRect(this.x, this.y, step, step);
	}
}