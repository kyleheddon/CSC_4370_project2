var Timeline = (function(){
	var _this;
	var isPlaying = false;
	var intervalId;

	var Timeline = function(framesPerSecond){
		this.fps = framesPerSecond || 10;
		_this = this;
	}

	Timeline.prototype.togglePlay = function(){
		if(isPlaying)
			stop();
		else
			play()
	}

	Timeline.prototype.onNewFrame = function(callback){
		this.newFrameHandler = callback;
	}

	function play(){
		isPlaying = true;
		intervalId = setInterval(_this.newFrameHandler, 1000/_this.fps);
	}

	function stop(){
		clearInterval(intervalId);
		isPlaying = false;
	}

	return Timeline;
})();
