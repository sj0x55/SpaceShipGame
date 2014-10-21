define(['app/Entity'], function (Entity) {
	var Bullet = function (level) {
		this.speed = 1272;
		this.image = "/bullet.png";
		this.segmentsMatrix = [];

		var i, j,
			size = Math.ceil((level || 1) / 5);

		if (size > 15) {
			size = 15;
		}
		else if (size <= 0) {
			size = 1;
		}

		for (i = 0; i <= size; i++) {
			for (j = 0; j <= size; j++) {
				this.segmentsMatrix[i] = this.segmentsMatrix[i] || [];
				this.segmentsMatrix[i][j] = 1;
			}
		}

		this.initialize();
	}.extend(Entity);

	Bullet.prototype.move = function (level, delta) {
		this.y -= this.speed * delta;
	};

	return Bullet;
});