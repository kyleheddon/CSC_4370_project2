var NUMBER_OF_ROWS = 80;
var NUMBER_OF_COLUMNS = 150;
var PERCENT_CHANCE_OF_STARTING_ALIVE = 50;
var FRAMES_PER_SECOND = 30;

function renderIncrementedGenerations(game, gameView, generations){
	game.incrementGenerations(generations);
	gameView.render();
}


var game = new Game(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS, PERCENT_CHANCE_OF_STARTING_ALIVE);
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

gameView.onRandomizeButtonClick(function(){
	game.randomize();
	gameView.render();
});


gameView.onResetButtonClick(function(){
	game.reset();
	gameView.render();
});
