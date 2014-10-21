define(['app/Entity', 'app/Bullet2'], function (Entity, Bullet2) {
	var Enemy3 = function () {
		this.speed = 84;
		this.image = "enemy3.png";
		this.points = 20;
		this.lives = 20;
		this.segmentsMatrix = [
			[0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
			[0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
			[1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
			[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
			[0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
		];

		this.horizontalMovements = 0;

		this.initialize();
	}.extend(Entity);

	Enemy3.prototype.move = function (level, delta) {
		var extraSpeed = Math.floor(level * 4) - 30,
			random = Math.random();

		this.y += (this.speed + extraSpeed) * delta;

		if (this.horizontalMovements === 0) {
			this.horizontalMovements = Math.round(random * 401) - 200;
		}

		if (this.horizontalMovements < 0) {
			this.x -= (this.speed + extraSpeed) * delta;
			this.horizontalMovements += 1;
		}
		else if (this.horizontalMovements > 0) {
			this.x += (this.speed + extraSpeed) * delta;
			this.horizontalMovements -= 1;
		}
	};

	Enemy3.prototype.shoot = function (level) {
		if (Math.round(Math.random() * 50) === 0) {
			var bullet = new Bullet2(level);

			bullet.setPosition(this.x + (this.width / 2) - (bullet.width / 2), this.y);
			bullet.initImageObject();

			return bullet;
		}
	};

	return Enemy3;
});