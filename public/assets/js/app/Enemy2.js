define(['app/Entity'], function (Entity) {
	var Enemy2 = function () {
		this.speed = 96;
		this.image = "enemy2.png";
		this.points = 10;
		this.lives = 10;
		this.segmentsMatrix = [
			[1, 0, 1, 1, 0, 1],
			[0, 1, 0, 0, 1, 0],
			[0, 1, 0, 0, 1, 0],
			[0, 1, 0, 0, 1, 0],
			[0, 1, 0, 0, 1, 0],
			[0, 0, 1, 1, 0, 0]
		];

		this.initialize();
	}.extend(Entity);

	Enemy2.prototype.move = function (level, delta) {
		var extraSpeed = Math.floor(level * 4) - 30;
		this.y += (this.speed + extraSpeed) * delta;
	};

	return Enemy2;
});