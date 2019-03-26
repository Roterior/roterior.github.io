function Fruit() {
	this.x;
	this.y;
	this.pickLocation = function() {
		this.x = (Math.floor(Math.random() * rows - 1) + 1) * step;
		this.y = (Math.floor(Math.random() * cols - 1) + 1) * step;
	}
	this.draw = function() {
		cntx.beginPath();
		cntx.fillStyle = "#FF0000";
		cntx.arc(this.x + step / 2, this.y + step / 2, step / 2 - 5, 0, 2 * Math.PI, true);
		cntx.fill();
		cntx.fillStyle = "rgb(120, 200, 120)";
		cntx.fillRect(this.x + step / 2 - 2, this.y + 3, 6, 8);
	}
}