define(['app/Entity'], function (Entity) {
	var Bullet2 = function () {
		this.speed = 512;
		this.image = "/bullet.png";
		this.segmentsMatrix = [
			[1],
			[1],
			[1],
			[1],
		];

		this.initialize();
	}.extend(Entity);

	Bullet2.prototype.move = function (level, delta) {
		var extraSpeed = Math.floor(level * 4) - 30;
		this.y += (this.speed + extraSpeed) * delta;
	};

	return Bullet2;
});