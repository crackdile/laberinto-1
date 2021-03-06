"use strict"; "use restrict";
var APP = APP||{};

APP.Controls = (function(){
	var self = {},
		player = null,
		isMovementLocked = true;

	self.onLoadPlayer = function(response) {
		player = new Player(response);
		setInterval(self.timerTick, APP.Config.get('delay'));
		document.onkeydown = self.onKeyDown;
		APP.Loader.set(100);
	}

	self.timerTick = function() {
		isMovementLocked = false;

		if(APP.Viewport.isOutOfBounds(player.x, player.y)) {
			console.log('outside bounds: ', player.x, player.y);
		}
	}

	self.onKeyDown = function(event) {
 		if(isMovementLocked === false) {
			isMovementLocked = true;

			switch (event.keyCode) {
				case 37:
					player.translate(player.x - 1,player.y);
					break;
				case 38:
					player.translate(player.x, player.y - 1);
					break;
				case 39:
					player.translate(player.x + 1, player.y);
					break;
				case 40:
					player.translate(player.x, player.y + 1);
					break;
				case 87:
					APP.Map.moveUp();
					break;
				case 83:
					APP.Map.moveDown();
					break;
				case 65:
					APP.Map.moveLeft();
					break;
				case 68:
					APP.Map.moveRight();
					break;
			}
		}
	}

	self.init = function() {
		APP.JSON.load('/api/player.json', self.onLoadPlayer);
	}

	return self;
})();