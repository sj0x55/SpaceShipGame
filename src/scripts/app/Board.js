define(['app/Entity', 'app/Ship', 'app/Bullet', 'app/Bullet2', 'app/Enemy1', 'app/Enemy2', 'app/Enemy3', 'app/Enemy4', 'app/Enemy5'], function (Entity, Ship, Bullet, Bullet2, Enemy1, Enemy2, Enemy3, Enemy4, Enemy5) {
	var
	_KEYS = { UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39, SPACE: 32 },
	_initCanvas = function () {
		var canvas = document.createElement("canvas");

		canvas.width = this.width;
		canvas.height = this.height;

		this.context = canvas.getContext("2d");
		this.target.appendChild(canvas);
	},
	_initEvents = function () {
		var that = this;

		document.addEventListener("keydown", function (e) {
			that.keysDown[e.keyCode] = true;
		}, false);

		document.addEventListener("keyup", function (e) {
			delete that.keysDown[e.keyCode];
		}, false);
	},
	_initEntities = function () {
		this.ship = new Ship();
		this.ship.setPosition((this.width / 2) - (this.ship.width / 2), this.height - this.ship.height);
	},
	_initImages = function () {
		this.initImageObject();
		this.ship.initImageObject();
	},
	_prepareSegmentsMap = function (entity) {
		var segmentsMap = {},
			startSegmentX = Math.round(entity.x / this.segmentsSize),
			startSegmentY = Math.round(entity.y / this.segmentsSize),
			x, y;

		for (y = 0; y < entity.segmentsVertical; y++) {
			for (x = 0; x < entity.segmentsHorizontal; x++) {
				if (entity.segmentsMatrix[y][x]) {
					segmentsMap[(startSegmentX + x) + '-' + (startSegmentY + y)] = 1;
				}
			}
		}

		return segmentsMap;
	},
	_checkCollision = function (entity1, entity2) {
		var segmentsMap,
			cordinates;

		if (
			(entity1.x + entity1.width + entity2.width) > (entity2.x + entity2.width) &&
			(entity1.x - entity2.width) < (entity2.x) &&
			(entity1.y + entity1.height + entity2.height) > (entity2.y + entity2.height) &&
			(entity1.y - entity2.height) < (entity2.y)
		) {
			if (!entity1.segmentsMap) {
				entity1.setSegmentsMap(_prepareSegmentsMap.call(this, entity1));
			}

			if (!entity2.segmentsMap) {
				entity2.setSegmentsMap(_prepareSegmentsMap.call(this, entity2));
			}

			for (cordinates in entity2.segmentsMap) {
				if (entity1.segmentsMap && entity1.segmentsMap[cordinates]) {
					if (this.developmentMode) {
						this.showSegments(cordinates, 'yellow', 'red');
					}
					else {
						this.showCollisions(cordinates);
						return true;
					}
				}
			}
		}
	},
	_entityShoot = function (entity, bullet) {
		this.addBullet(entity, bullet);
	},
	_increaseSpeed = function () {
		return Math.floor(this.gameLevel * 4) - 30;
	},
	_getShipBullets = function () {
		var d = 20 + (this.gameLevel * 3),
			max = Math.ceil(this.userPoints / d);

		if (max <= 0) {
			return 3;
		}
		else {
			return max + 3;
		}
	},
	_addEnemyByLevel = function () {
		var random = Math.random(),
			chance;

		if (this.gameLevel >= 15) {
			chance = 10;
		}
		else if (this.gameLevel >= 10) {
			chance = 20;
		}
		else if (this.gameLevel >= 5) {
			chance = 50;
		}
		else if (this.gameLevel >= 2) {
			chance = 80;
		}
		else {
			chance = 100;
		}

		if (this.enemies.length < 1500) {
			if (Math.round(random * chance * 0.3) === 0) {
				this.addEnemy(Enemy1);
			}
			if (this.gameLevel >= 2 && Math.round(random * (chance * 2)) === 0) {
				this.addEnemy(Enemy2);
			}
			if (this.gameLevel >= 5 && Math.round(random * (chance * 4)) === 0) {
				this.addEnemy(Enemy3);
			}
			if (this.gameLevel >= 10 && Math.round(random * (chance * 5)) === 0) {
				this.addEnemy(Enemy4);
			}
			if (this.gameLevel >= 15 && Math.round(random * (chance * 6)) === 0) {
				this.addEnemy(Enemy5);
			}
		}
	},
	_isVisibility = function (entity) {
		return entity && entity.y <= this.height && entity.y >= -(entity.height * 2);
	};

	var Board = function (config) {
		this.developmentMode = false;
		this.target = config && config.target;
		this.targetResult = config && config.targetResult;
		this.context = undefined;
		this.ship = undefined;
		this.bullets = [];
		this.bullets2 = [];
		this.enemies = [];
		this.keysDown = {};
		this.now = undefined;
		this.delta = undefined;
		this.then = Date.now();
		this.speed = 48;
		this.image = "background3.jpg";
		this.isGameOver = false;
		this.segmentsHorizontal = config.segmentsHorizontal || Math.floor((window.innerWidth - 20) / this.segmentsSize);
		this.segmentsVertical = config.segmentsVertical || Math.floor((window.innerHeight - 20) / this.segmentsSize);
		this.segmentsMap = {};
		this.userPoints = 0;
		this.gameLevel = 1;
		this.loopCounter = 0;
		this.levelLoopCounter = 0;
		this.allLoopCounter = 0;
		this.fps = 0;

		this.initialize();
	}.extend(Entity);

	Board.prototype.create = function () {
		_initCanvas.call(this);
		_initEvents.call(this);
		_initEntities.call(this);
		_initImages.call(this);

		this.start();
	};

	Board.prototype.render = function () {
		var i, l;

		this.context.clearRect(0, 0, this.width, this.height);

		this.draw(this.context);
		this.ship.draw(this.context);

		for (i = 0, l = this.bullets.length; i < l; i++) {
			this.bullets[i].draw(this.context);
		}

		for (i = 0, l = this.bullets2.length; i < l; i++) {
			this.bullets2[i].draw(this.context);
		}

		for (i = 0, l = this.enemies.length; i < l; i++) {
			this.enemies[i].draw(this.context);
		}

		this.showFPS(this.fps);
		this.showGameLevel(this.gameLevel);
		this.showPoints(this.userPoints);
	};

	Board.prototype.draw = function (context) {
		var height = 0;

		if (this.imageObject.ready) {
			height = this.imageObject.height * (this.width / this.imageObject.width);

			if (this.y >= height) {
				this.y = 0;
			}

			context.drawImage(this.imageObject, this.x, this.y, this.width, height);
			context.drawImage(this.imageObject, this.x, this.y - height, this.width, height);
		}
	};

	Board.prototype.update = function (m) {
		var that = this,
			shipX = this.ship.x,
			shipY = this.ship.y,
			bullet,
			i, len, 
			j, len2, 
			points,
			random = Math.random();

		if (this.developmentMode) {
			this.showAllSegments();
		}

		// Move ship
		if (_KEYS.UP in this.keysDown) {
			shipY -= this.ship.speed * m;
		}
		if (_KEYS.DOWN in this.keysDown) {
			shipY += this.ship.speed * m;
		}
		if (_KEYS.LEFT in this.keysDown) {
			shipX -= this.ship.speed * m;
		}
		if (_KEYS.RIGHT in this.keysDown) {
			shipX += this.ship.speed * m;
		}
		if (shipY >= 0 && shipY <= (this.height - this.ship.height) && this.ship.y !== shipY) {
			this.ship.y = shipY;
		}
		if (shipX >= 0 && shipX <= (this.width - this.ship.width) && this.ship.x !== shipX) {
			this.ship.x = shipX;
		}

		// Shot by user
		if (_KEYS.SPACE in this.keysDown && this.bullets.length < _getShipBullets.call(this)) {
			this.bullets.push(this.ship.shoot(this.gameLevel));
		}

		this.ship.setSegmentsMap(_prepareSegmentsMap.call(this, this.ship));

		// Check detection enemies with ship bullets and check if enemies is beyond ob the board
		firstLoop:
		for (i = 0, len = this.bullets.length; i < len; i++) {
			if (this.bullets[i]) {
				if (_isVisibility.call(this, this.bullets[i])) {
					this.bullets[i].move(this.gameLevel, m);

					for (j = 0, len2 = this.enemies.length; j < len2; j++) {
						if (this.enemies[j]) {
							this.bullets[i].setSegmentsMap(undefined);
							this.enemies[j].setSegmentsMap(undefined);

							if (_checkCollision.apply(this, [this.bullets[i], this.enemies[j]])) {
								if (--this.enemies[j].lives <= 0) {
									this.addPoints(this.enemies[j].points);
									this.enemies.splice(j, 1);
								}

								this.bullets.splice(i, 1);
								continue firstLoop;
							}
						}
					}
				}
				else {
					this.bullets.splice(i, 1);
					continue;
				}
			}
		}

		// Move enemy bullets
		for (i = 0, len = this.bullets2.length; i < len; i++) {
			if (this.bullets2[i]) {
				if (_isVisibility.call(this, this.bullets2[i])) {
					this.bullets2[i].move(this.gameLevel, m);

					this.bullets2[i].setSegmentsMap(undefined);

					if (_checkCollision.apply(this, [this.bullets2[i], this.ship])) {
						if (!this.developmentMode) {
							this.gameOver();
							break;
						}
					}
				}
				else {
					this.bullets2.splice(i, 1);
					continue;
				}
			}
		}

		// Add new enemy (randomly)
		_addEnemyByLevel.call(this);

		// Move/Shoot enemies and check colision with ship.
		for (i = 0, l = this.enemies.length; i < l; i++) {
			if (this.enemies[i]) {
				if (_isVisibility.call(this, this.enemies[i])) {
					this.enemies[i].move(this.gameLevel, m);
					bullet = this.enemies[i].shoot(this.gameLevel);

					if (bullet) {
						this.bullets2.push(bullet);
					}

					this.enemies[i].setSegmentsMap(undefined);
					if (_checkCollision.apply(this, [this.ship, this.enemies[i]])) {
						this.gameOver();
						break;
					}
				}
				else {
					this.enemies.splice(i, 1);
					continue;
				}
			}
		}

		this.move(this.gameLevel, m);

		if (this.levelLoopCounter > 5) {
			this.levelLoopCounter = 0;
			this.gameLevel++;
		}
	};

	Board.prototype.move = function (level, delta) {
		var extraSpeed = Math.floor(level * 4) - 30;
		this.y += ((this.speed + extraSpeed) * delta) / 1.5;
	};

	Board.prototype.addPoints = function (points) {
		if (this.targetResult) {
			this.userPoints += points;
		}
	};

	Board.prototype.showCollisions = function (cordinates) {
		var c = cordinates.split('-');

		this.context.beginPath();
		this.context.arc(c[0] * this.segmentsSize, c[1] * this.segmentsSize, 8, 0, 2 * Math.PI, false);
		this.context.fillStyle = 'red';
		this.context.fill();
	};

	Board.prototype.showAllSegments = function () {
		var c, i, j,
			segmentsMap, cordinates,
			listsOfEntities = [this.enemies, this.bullets, this.bullets2, [this.ship]];

		for (i in listsOfEntities) {
			if (listsOfEntities.hasOwnProperty(i)) {
				for (j in listsOfEntities[i]) {
					if (listsOfEntities[i].hasOwnProperty(j)) {
						segmentsMap = _prepareSegmentsMap.call(this, listsOfEntities[i][j]);

						for (cordinates in segmentsMap) {
							this.showSegments(cordinates);
						}
					}
				}
			}
		}
	};

	Board.prototype.showSegments = function (cordinates, strokeColor, fillColor) {
		var c = cordinates.split('-');
		this.context.beginPath();
		this.context.rect(c[0] * this.segmentsSize, c[1] * this.segmentsSize, this.segmentsSize, this.segmentsSize);
		if (fillColor) {
			this.context.fillStyle = fillColor;
			this.context.fill();
		}
		this.context.lineWidth = 1;
		this.context.strokeStyle = strokeColor || 'white';
		this.context.stroke();
	};


	Board.prototype.gameOver = function () {
		this.enemies = [];
		this.bullets = [];
		this.bullets2 = [];
		this.keysDown = {};
		this.isGameOver = true;
	};

	Board.prototype.addBullet = function (entity, bulletClass) {
		var bullet = new bulletClass(this.gameLevel);

		bullet.setPosition(entity.x + (entity.width / 2) - (bullet.width / 2), entity.y);
		bullet.initImageObject();

		if (bullet instanceof Bullet2) {
			this.bullets2.push(bullet);
		}
		else {
			this.bullets.push(bullet);
		}
	};

	Board.prototype.addEnemy = function (object) {
		var enemy = new object(),
			x = Math.round(Math.random() * this.width) + 1;

		if (x >= this.width) {
			x -= enemy.width;
		}

		if (x <= enemy.width) {
			x = enemy.width;
		}

		if (x >= this.width - (enemy.width * 2)) {
			x = this.width - (enemy.width * 2);
		}

		enemy.setPosition(x, -enemy.height);
		enemy.initImageObject();

		this.enemies.push(enemy);
	};

	Board.prototype.start = function () {
		var that = this;

		this.now = Date.now();
		this.delta = this.now - this.then;

		this.render();
		this.update(this.delta / 1000);
		this.then = this.now;

		this.loopCounter += 1 * (this.delta / 1000);
		this.allLoopCounter += 1 * (this.delta / 1000);
		this.levelLoopCounter += 1 * (this.delta / 1000);

		if (this.loopCounter > 1) {
			this.loopCounter = 0;
			this.fps = 1000 / (this.delta);
		}

		this.requestAnimationFrame(function() {
			if (!that.isGameOver) {
				that.start();
			}
			else {
				that.showGameOver();
			}
		});
	};

	Board.prototype.showGameOver = function () {
		this.target.innerHTML = '<div id="game-over">GAME OVER!</div>';
	};

	Board.prototype.showPoints = function (fps) {
		this.context.font = '14px Arial';
		this.context.fillStyle = "White";
		this.context.fillText('SCORE: ' + this.userPoints, 10, 15);
	};

	Board.prototype.showGameLevel = function (fps) {
		this.context.font = '12px Arial';
		this.context.fillStyle = "White";
		this.context.fillText('Level: ' + this.gameLevel, 10, 30);
	};

	Board.prototype.showFPS = function (fps) {
		this.context.font = '10px Arial';
		this.context.fillStyle = "White";
		this.context.fillText('FPS: ' + Math.round(fps), 10, 45);
	};

	Board.prototype.requestAnimationFrame = function (func) {
		var requestAnimationFrame = (function () {
			return (
				window.requestAnimationFrame       ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				window.oRequestAnimationFrame      ||
				window.msRequestAnimationFrame	   ||
				function(func) {
					window.setTimeout(func, 1000 / 60);
				}
			);
		}());

		return requestAnimationFrame(func);
	};

	return Board;
});

