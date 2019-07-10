//<------------- EXTRA: OBJECT CONSTRUCTOR --------------------->
//You can use object constructors to quickly make mutliple objects that share characteristics.
//We will discuss this later in great length, so don't worry about it now.
//If you are interested, read here:
// https://www.w3schools.com/js/js_object_constructors.asp

function Game() {
	//Array with all the objects of the game, so we can easily locate their position.
	this.gameObjects = [];
	this.checkCollision = function() {
		for (let i = 0; i < this.gameObjects.length; i++) {
			for (let j = 0; j < this.gameObjects.length; j++) {
				//Need to check location of all the game objects and also whether
				// the condition (i !== j) means that we're not evaluating the position of the object itself.
				if (
					this.gameObjects[i].x === this.gameObjects[j].x &&
					this.gameObjects[i].y === this.gameObjects[j].y &&
					i !== j
				) {
					console.log(
						`Collision at X:${this.gameObjects[i].x} Y: ${
							this.gameObjects[i].y
						}`
					);
				}
			}
		}
	};
}

//Rover object constructor
function Rover(x, y, direction, game) {
	this.x = x;
	this.y = y;
	this.direction = direction;
	this.travelLog = [];

	this.turnLeft = function() {
		switch (this.direction) {
			case "N":
				this.direction = "W";
				break;
			case "W":
				this.direction = "S";
				break;
			case "S":
				this.direction = "E";
				break;
			case "E":
				this.direction = "N";
				break;
		}
	};

	this.turnRight = function() {
		switch (this.direction) {
			case "N":
				this.direction = "E";
				break;
			case "E":
				this.direction = "S";
				break;
			case "S":
				this.direction = "W";
				break;
			case "W":
				this.direction = "N";
				break;
		}
	};

	this.moveBackward = function() {
		switch (this.direction) {
			case "N":
				if (this.y < 10) {
					this.y++;
				} else throw new Error("Out of boundry");
				break;
			case "W":
				if (this.x < 10) {
					this.x++;
				} else throw new Error("Out of boundry");
				break;
			case "S":
				if (this.x > 0) {
					this.y.y--;
				} else throw new Error("Out of boundry");
				break;
			case "E":
				if (this.x > 0) {
					this.x--;
				} else throw new Error("Out of boundry");
				break;
		}
		this.travelLog.push([this.x, this.y]);
		console.log("moveForward was called");
	};

	this.moveForward = function() {
		switch (this.direction) {
			case "N":
				if (this.y > 0) {
					this.y--;
				} else throw new Error("Out of boundry");
				break;
			case "W":
				if (this.x > 0) {
					this.x--;
				} else throw new Error("Out of boundry");
				break;
			case "S":
				if (this.x < 10) {
					this.y++;
				} else throw new Error("Out of boundry");
				break;
			case "E":
				if (this.x < 10) {
					this.x++;
				} else throw new Error("Out of boundry");
				break;
		}
		this.travelLog.push([this.x, this.y]);
		console.log("moveForward was called");
	};

	this.commands = function(command) {
		//Command must be a string
		if (typeof command !== "string") {
			throw new Error("Command needs to be a string");
		}
		for (let i = 0; i < command.length; i++) {
			game.checkCollision();
			//Change every letter to lowercase.
			switch (command[i].toLowerCase()) {
				case "f":
					this.moveForward();
					break;
				case "b":
					this.moveBackward();
					break;
				case "r":
					this.turnRight();
					break;
				case "l":
					this.turnLeft();
					break;
				default:
					//If there's an invalid command, throw error.
					throw new Error("Invalid command");
			}
		}
	};

	//When object is instantiated push it into a game array
	game.gameObjects.push(this);
}

function Obstacle(x, y, game) {
	this.x = x;
	this.y = y;
	game.gameObjects.push(this);
}

//Instantiate a game
const game = new Game();
//Create obstacles
const obstacel1 = new Obstacle(1, 2, game);
const obstacel2 = new Obstacle(2, 1, game);

//create rovers and add them to the game
const roverOne = new Rover(4, 4, "N", game);
const roverTwo = new Rover(2, 2, "W", game);

roverOne.commands("rfffffrfffff");
roverTwo.commands("ff");
console.log(roverOne.travelLog);
