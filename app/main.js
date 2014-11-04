var NUMBER_OF_ROWS = 80;
var NUMBER_OF_COLUMNS = 150;
var PERCENT_CHANCE_OF_STARTING_ALIVE = 10;
var FRAMES_PER_SECOND = 30;

function createRandomData(){
	var gameData = [];
	var percentChanceOfBeingAlive = PERCENT_CHANCE_OF_STARTING_ALIVE / 100;

	for(var i = 0; i < NUMBER_OF_ROWS; i++){
		gameData[i] = [];
		for(var j = 0; j < NUMBER_OF_COLUMNS; j++){
			if(Math.random() <= percentChanceOfBeingAlive)
				gameData[i][j] = 1;
			else
				gameData[i][j] = 0;
		}
	}
	return gameData;
}

function renderIncrementedGenerations(game, gameView, generations){
	game.incrementGenerations(generations);
	gameView.render();
}


var gameData = createRandomData();
var game = new Game(gameData);
var gameView = new GameView(game);
var timeline = new Timeline(FRAMES_PER_SECOND);

gameView.render();

gameView.onIncrementOneGenerationButtonClick(function(){
	renderIncrementedGenerations(game, gameView, 1)
});

gameView.onIncrementManyGenerationsButtonClick(function(){
	renderIncrementedGenerations(game, gameView, 23)
});

timeline.onNewFrame(function(){
	renderIncrementedGenerations(game, gameView, 1)
});

gameView.onTogglePlayButtonClick(function(){
	timeline.togglePlay();
});
