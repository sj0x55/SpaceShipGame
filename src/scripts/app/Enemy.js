define(['app/Entity'], function (Entity) {
	var Enemy = function () {
		this.speed = 0;
		this.image = undefined;
		this.points = 0;
		this.lives = 0;
		this.segmentsMatrix = [];

		this.initialize();
	}.extend(Entity);

	return Enemy;
});