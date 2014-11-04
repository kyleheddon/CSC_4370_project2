var Game = (function(){
	var _this, numberOfRows, numberOfColumns, percentChanceOfStartingAlive;
	var Game = function(numRows, numColumns, percentChanceAlive){
		_this = this;
		numberOfRows = numRows;
		numberOfColumns = numColumns;
		percentChanceOfStartingAlive = percentChanceAlive;
		this.cells = constructRandomizedCells();
		this.generation = 0;
	}

	Game.prototype.incrementGenerations = function(numberOfGenerations){
		for(var i = 0; i < numberOfGenerations; i++){
			incrementGeneration();
		}
	}

	Game.prototype.randomize = function(){
		this.cells = constructRandomizedCells();
		this.generation = 0;
	}

	Game.prototype.reset = function(){
		for(var i = 0; i < this.cells.length; i++){
			for(var j = 0; j < this.cells[i].length; j++){
				this.cells[i][j].alive = false;
			}
		}
		this.generation = 0;
	}

	function incrementGeneration(){
		var cells = _this.cells;
		var previousGeneration = deepCopy(cells);
		for(var i = 0; i < cells.length; i++){
			for(var j = 0; j < cells[i].length; j++){
				setNewCellState(cells[i][j], previousGeneration);
			}
		}
		_this.generation += 1;
	}

	function constructRandomizedCells(){
		var data = createRandomData();
		var row, cell, cells = [];

		for(var i = 0; i < data.length; i++){
			row = [];
			for(var j = 0; j < data[i].length; j++){
				cell = new Cell(i, j, data[i][j]);
				row.push(cell);
			}
			cells.push(row);
		}
		return cells;
	}

	function createRandomData(){
		var gameData = [];

		for(var i = 0; i < numberOfRows; i++){
			gameData[i] = [];
			for(var j = 0; j < numberOfColumns; j++){
				if(Math.random() <= percentChanceOfStartingAlive / 100)
					gameData[i][j] = 1;
				else
					gameData[i][j] = 0;
			}
		}
		return gameData;
	}

	function deepCopy(cells){
		return JSON.parse(JSON.stringify(cells));
	}

	function setNewCellState(cell, previousGeneration){
		var numberOfLivingNeighbors = calculateNumberOfLivingNeighbors(cell, previousGeneration);

		if(cell.alive && (numberOfLivingNeighbors < 2 || numberOfLivingNeighbors > 3)){
			cell.alive = false;
		} else if(!cell.alive && numberOfLivingNeighbors == 3){
			cell.alive = true;
		}
	}

	function calculateNumberOfLivingNeighbors(cell, previousGeneration){
		var number = 0;
		var neighboringCells = getNeighboringCells(cell, previousGeneration);
		var currentCell;
		for(var i = 0; i < neighboringCells.length; i++){
			currentCell = neighboringCells[i];
			if(currentCell && currentCell.alive)
				number += 1;
		}

		return number;
	}

	function getNeighboringCells(cell, previousGeneration){
		return [
			getRelativeCell(cell, previousGeneration, -1, -1),
			getRelativeCell(cell, previousGeneration, -1, 0),
			getRelativeCell(cell, previousGeneration, -1, 1),
			getRelativeCell(cell, previousGeneration, 0, -1),
			getRelativeCell(cell, previousGeneration, 0, 1),
			getRelativeCell(cell, previousGeneration, 1, -1),
			getRelativeCell(cell, previousGeneration, 1, 0),
			getRelativeCell(cell, previousGeneration, 1, 1)
		];
	}

	function getRelativeCell(cell, previousGeneration, yChange, xChange){
		var row = previousGeneration[cell.row + yChange];
		if(row)
			return row[cell.column + xChange];
	}

	return Game;
})();

var Cell = (function(){
	var Cell = function(row, column, alive){
		this.alive = alive ? true : false;
		this.row = row;
		this.column = column;
	}

	return Cell;
})();
