define(['app/Board'], function(Board) {
	var board = new Board({
		target: document.querySelector('#game'),
		targetResult: document.querySelector('#result')
	});

	board.create();

});

