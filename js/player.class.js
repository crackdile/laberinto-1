"use strict"; "use restrict";

var Player = function(newOptions) {
	this.initialize(newOptions);
}

Player.prototype = new Actor();