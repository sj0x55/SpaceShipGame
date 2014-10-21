define(['app/Entity', 'app/Bullet'], function (Entity, Bullet) {
	var Ship = function () {
		this.speed = 512;
		this.image = "ship.png";
		this.segmentsMatrix = [
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
			[0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
			[1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
			[1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
			[1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
			[0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
		];

		this.maxBullets = 1;

		this.initialize();
	}.extend(Entity);

	Entity.prototype.move = function (level, delta) {

	};

	Ship.prototype.shoot = function (level) {
		var bullet = new Bullet(level);

		bullet.setPosition(this.x + (this.width / 2) - (bullet.width / 2), this.y);
		bullet.initImageObject();

		return bullet;
	};

	return Ship;
});