// Rover object.

const rover = {
	direction: "N",
	x: 0,
	y: 0,
	travelLog: []
};

//Obstacle object.
const obstacle = {
	x: 4,
	y: 4
};

//The grid, a two dimensional array.
const grid = [
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, "X", null, null],
	["X", null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null, null]
];

function turnLeft(aRover) {
	switch (aRover.direction) {
		case "N":
			aRover.direction = "W";
			break;
		case "W":
			aRover.direction = "S";
			break;
		case "S":
			aRover.direction = "E";
			break;
		case "E":
			aRover.direction = "N";
			break;
		default:
			throw new Error("Something went wrong");
	}
	console.log("turnLeft was called!");
}

function turnRight(aRover) {
	switch (aRover.direction) {
		case "N":
			aRover.direction = "E";
			break;
		case "E":
			aRover.direction = "S";
			break;
		case "S":
			aRover.direction = "W";
			break;
		case "W":
			aRover.direction = "N";
			break;
		default:
			throw new Error("Something went wrong");
	}
	console.log("turnRight was called!");
}

function moveForward(aRover) {
	switch (aRover.direction) {
		case "N":
			//Check boundry and collision before moving rover.
			if (
				rover.y > 0 &&
				!checkForObstacleCollision({ x: rover.x, y: rover.y - 1 }, grid)
			) {
				aRover.y--;
			} else {
				//You could throw an error here, altough strictly speaking it's not an error, but rather invalid game logic.
				console.log("Invalid move");
			}
			break;
		case "W":
			if (
				rover.x > 0 &&
				!checkForObstacleCollision({ x: rover.x - 1, y: rover.y }, grid)
			) {
				aRover.x--;
			} else {
				console.log("Invalid move");
			}
			break;
		case "S":
			if (
				rover.y < 10 &&
				!checkForObstacleCollision({ x: rover.x, y: rover.y + 1 }, grid)
			) {
				aRover.y++;
			} else {
				console.log("Invalid Move");
			}
			break;
		case "E":
			if (
				rover.x < 10 &&
				!checkForObstacleCollision({ x: rover.x + 1, y: rover.y }, grid)
			) {
				aRover.x++;
			} else {
				console.log("Invalid Move");
			}

			break;
		default:
			throw new Error("Something went wrong");
	}
	aRover.travelLog.push([aRover.x, aRover.y]);
	console.log("moveForward was called");
}

//I left out all the if statements for collision in moving backwards, so you can see how the code normally looks like.
function moveBackward(aRover) {
	switch (aRover.direction) {
		case "N":
			aRover.y++;
			break;
		case "W":
			aRover.x++;
			break;
		case "S":
			aRover.y--;
			break;
		case "E":
			aRover.x--;
			break;
	}
	aRover.travelLog.push([aRover.x, aRover.y]);
	console.log("moveForward was called");
}

function commands(command, aRover) {
	//Throw an error if command is not string or not empty
	if (typeof command !== "string" && !command) {
		throw new Error("Command should be a string and not empty");
	}

	//Must take rover as input -> little fact: this will still work with an array, because arrays are actually objects (JS is weird).
	//Read more about it here: https://stackoverflow.com/questions/5048371/are-javascript-arrays-primitives-strings-objects.
	// Or here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array.

	if (typeof rover !== "object" && !aRover) {
		throw new Error("Please put in an object");
	}
	//Loop over every letter of the command.
	for (let i = 0; i < command.length; i++) {
		//3. Change commands to lower case.
		switch (command[i].toLocaleLowerCase()) {
			//command[i] === one letter
			case "f":
				moveForward(aRover);
				break;
			case "b":
				moveBackward(aRover);
				break;
			case "r":
				turnRight(aRover);
				break;
			case "l":
				turnLeft(aRover);
				break;
			default:
				console.log(`${command[i]} is a invalid command`);
				break;
		}
	}
}
// newPosition looks like { x: rover.x, y : rover.y + 1 }
function checkForObstacleCollision(newPosition, array) {
	for (let y = 0; y < array.length; y++) {
		for (let x = 0; x < array[y].length; x++) {
			//Here we check whether the element in the grid is equal to "X"
			//and if it matches the rover's new position
			if (array[y][x] === "X" && newPosition.x === x && newPosition.y === y) {
				console.log(
					`Cannot move here there's an obstacle at X:${newPosition.x} Y ${
						newPosition.y
					} `
				);
				return true;
			}
		}
	}
	return false;
	//Another solution would be to directly use the coordinates in the grid.
	//return matrix[newPosition.x][newPosition.y] === "X" ? true : false;
}

commands("rrfffff", rover);
console.log(rover.travelLog);

// <-------------- EXTRA: CONSTRUCTING AN MULTIDIMENSION ARRAY WITH ARRAY CONSTRUCTOR ------------>
//If you're to lazy to write a 10 by 10 array, it can also be done in a function.

function createMultiDimenensionalArray(row, column) {
	if (row <= 0 || column <= 0) throw new Error("Need positive integers");

	//First create a row with length 10 filled with null values.
	const rowArray = new Array(row).fill(null);

	//Create 10 columns.
	return new Array(column).fill(rowArray);
}

const matrix = createMultiDimenensionalArray(10, 10);

//create a function to add an obstacle.
function createObstacle(array, x, y) {
	//Obstacle needs to be inside the scope of array.
	if (x > 0 && x < array[y].length && y > 0 && y < array.length) {
		//Since all rows refer to the same space in memory, we first have to make a copy of the row.
		//... is called the spread operator (more on that later in the course) and it's convenient method for copying objects and arrays.
		const row = [...array[y]];
		//Change null to "X" and mutate array.
		row[x] = "X";
		array[y] = row;
	}
}

createObstacle(matrix, 0, 3);
createObstacle(matrix, 9, 5);
console.log(matrix);
