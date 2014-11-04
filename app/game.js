var Game = (function(){
	var _this;
	var Game = function(data){
		this.cells = constructCells(data);
		_this = this;
	}

	Game.prototype.incrementGenerations = function(numberOfGenerations){
		for(var i = 0; i < numberOfGenerations; i++){
			incrementGeneration();
		}
	}

	function incrementGeneration(){
		var cells = _this.cells;
		var previousGeneration = deepCopy(cells);
		for(var i = 0; i < cells.length; i++){
			for(var j = 0; j < cells[i].length; j++){
				setNewCellState(cells[i][j], previousGeneration);
			}
		}
	}

	function constructCells(data){
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

	function deepCopy(cells){
		return JSON.parse(JSON.stringify(cells));
	}

	function setNewCellState(cell, previousGeneration){
		if(cell.alive){
			console.log(cell);
		}
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

		var neighboringCells = [
			getRelativeCell(cell, previousGeneration, -1, -1),
			getRelativeCell(cell, previousGeneration, -1, 0),
			getRelativeCell(cell, previousGeneration, -1, 1),
			getRelativeCell(cell, previousGeneration, 0, -1),
			getRelativeCell(cell, previousGeneration, 0, 1),
			getRelativeCell(cell, previousGeneration, 1, -1),
			getRelativeCell(cell, previousGeneration, 1, 0),
			getRelativeCell(cell, previousGeneration, 1, 1)
		];

		return neighboringCells;
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
