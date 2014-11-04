var GameView = (function(){
	var tableId = 'game';
	var incrementOneGenerationButtonId = 'increment_one_generation';
	var incrementManyGenerationsButtonId = 'increment_many_generations';
	var togglePlayButtonId = 'toggle_play';
	var generationId = 'generation';
	var _this;

	var GameView = function(game){
		this.game = game;
		this.table = createTable();
		_this = this;
	}

	GameView.prototype.render = function(){
		renderCells();
		renderGenerationNumber();
	}

	GameView.prototype.onIncrementOneGenerationButtonClick = function(callback){
		document.getElementById(incrementOneGenerationButtonId).addEventListener('click', function(event){
			event.preventDefault();
			callback();
		});
	}

	GameView.prototype.onIncrementManyGenerationsButtonClick = function(callback){
		document.getElementById(incrementManyGenerationsButtonId).addEventListener('click', function(event){
			event.preventDefault();
			callback();
		});
	}

	GameView.prototype.onTogglePlayButtonClick = function(callback){
		var button = document.getElementById(togglePlayButtonId);
		button.addEventListener('click', function(event){
			event.preventDefault();

			var text = button.innerHTML;
			if(text == 'Pause')
				button.innerHTML = 'Play'
			else
				button.innerHTML = 'Pause'

			callback();
		});
	}

	function createTable(){
		var table = document.getElementById(tableId);

		var row, cell;
		for(var i = 0; i < this.game.cells.length; i++){
			row = table.insertRow();
			for(var j = 0; j < this.game.cells[i].length; j++){
				cell = row.insertCell();
				setupCellClick(cell, i, j);
			}
		}

		return table;
	}

	function setupCellClick(cellElement, row, column){
		cellElement.addEventListener('click', function(event){
			event.preventDefault();
			var gameCell = _this.game.cells[row][column];
			gameCell.alive = gameCell.alive ? false : true;
			_this.render();
		});
	}

	function renderCells(){
		var cell, element;

		for(var i = 0; i < _this.game.cells.length; i++){
			for(var j = 0; j < _this.game.cells[i].length; j++){
				cell = game.cells[i][j];
				element = _this.table.rows[i].cells[j];

				renderCell(cell, element);
			}
		}
	}

	function renderCell(cell, element){
		if(cell.alive)
			element.classList.add('alive')
		else
			element.classList.remove('alive')
	}

	function renderGenerationNumber(){
		document.getElementById(generationId).innerHTML = _this.game.generation;
	}

	return GameView;
})();
