define(['app/Config'], function (Config) {
	var Entity = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.image = undefined;
		this.imageObject = undefined;
		this.segmentsMatrix = [];
		this.segmentsMap = {};
		this.segmentsHorizontal = undefined;
		this.segmentsVertical = undefined;
		this.segmentsSize = 5;
	};

	Entity.prototype.initialize = function () {
		if (typeof this.segmentsVertical === 'undefined') {
			this.segmentsVertical = this.segmentsMatrix.length;
		}

		if (typeof this.segmentsHorizontal === 'undefined') {
			this.segmentsHorizontal = (this.segmentsMatrix[0] || []).length;
		}

		this.width = this.segmentsSize * this.segmentsHorizontal;
		this.height = this.segmentsSize * this.segmentsVertical;
	};

	Entity.prototype.setPosition = function (x, y) {
		this.x = Math.round(x);
		this.y = Math.round(y);

		return this;
	};

	Entity.prototype.setSegmentsMap = function (map) {
		this.segmentsMap = map;
	};

	Entity.prototype.initImageObject = function () {
		var that = this;

		this.imageObject = new Image();
		this.imageObject.onload = function () {
			that.imageObject.ready = true;
		};

		this.imageObject.src = Config.imagesPath + this.image;
	};

	Entity.prototype.draw = function (context) {
		if (this.imageObject.completed || this.imageObject.ready) {
			context.drawImage(this.imageObject, Math.round(this.x), Math.round(this.y), this.width, this.height);
		}
	};

	Entity.prototype.move = function (level, delta) {
		// var extraSpeed = Math.floor(level * 4) - 30;
		// this.y += (this.speed + extraSpeed) * delta;
		return undefined;
	};

	Entity.prototype.shoot = function (level) {
		return undefined;
	};

	return Entity;
});