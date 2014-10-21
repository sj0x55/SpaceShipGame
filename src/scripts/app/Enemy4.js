define(['app/Entity'], function (Entity) {
	var Enemy4 = function () {
		this.speed = 32;
		this.image = "enemy.png";
		this.points = 30;
		this.lives = 30;
		this.segmentsMatrix = [
			[1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1],
			[1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
			[0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0],
			[0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0],
			[0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0]
		];

		this.initialize();
	}.extend(Entity);

	Enemy4.prototype.move = function (level, delta) {
		var extraSpeed = Math.floor(level * 4) - 30;
		this.y += (this.speed + extraSpeed) * delta;
	};

	return Enemy4;
});