define(['app/Entity'], function (Entity) {
	var Enemy1 = function () {
		this.speed = 48;
		this.image = "enemy.png";
		this.points = 1;
		this.lives = 2;
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

	Enemy1.prototype.move = function (level, delta) {
		var extraSpeed = Math.floor(level * 4) - 30;
		this.y += (this.speed + extraSpeed) * delta;
	};

	return Enemy1;
});