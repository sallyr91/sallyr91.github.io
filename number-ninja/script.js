//CONSTANTS ------
$(document).ready(function(){  
    headerHeight = $('#menu-header1').height();
	
	if(headerHeight == 0) {
		headerHeight = $('#menu-header2').height();
	}
	if(headerHeight == 0) {
		headerHeight = $('#highest-header').height();
	}
	if(headerHeight == 0) {
		headerHeight = $('#lowest-header').height();
	}
	if(headerHeight == 0) {
		headerHeight = $('#odd-header').height();
	}
	if(headerHeight == 0) {
		headerHeight = $('#even-header').height();
	}
});  

var fps          = 30;
var largestNum   = 0;
var maxNum       = 100;
var squareSize   = 64;
var margin       = 8;
var padding      = 8;
var xPos;
var yPos;
var rectList      = new Array();
var rectPositions = new Array([margin, margin], 
							  [margin+squareSize+padding, margin], 
							  [margin+(squareSize*2)+padding*2, margin],
							  [margin, margin+squareSize+padding], 
							  [margin+squareSize+padding, margin+squareSize+padding], 
							  [margin+(squareSize*2)+padding*2, margin+squareSize+padding],
							  [margin, margin+(squareSize*2)+padding*2], 
							  [margin+squareSize+padding, margin+(squareSize*2)+padding*2], 
							  [margin+(squareSize*2)+padding*2, margin+(squareSize*2)+padding*2]);
//CONSTANTS ------ 

//FUNCTIONS ------
function refresh() {
	window.location.assign("#mainmenu");
}

function resizeCanvas() {
	var gameArea = document.getElementById('canvas');
    var widthToHeight = 4 / 3;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameArea.style.height = newHeight + 'px';
        gameArea.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';
    }
    
    gameArea.style.marginTop = (-newHeight / 2) + 'px';
    gameArea.style.marginLeft = (-newWidth / 2) + 'px';
    
    var gameCanvas = document.getElementById('canvas');
    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;
}
//FUNCTIONS ------

//PROTOTYPE ------
function Rect(x, y, width, height, color, number) {
	this.x = x;
	this.y = y;
	this.width  = width;
	this.height = height;
	this.color  = color;
	this.number = number;
	
	this.draw = function(canvasID) {
		var canvas   = document.getElementById(canvasID);
		var context  = canvas.getContext("2d");
		
		context.beginPath();
		context.rect(this.x, this.y, this.width, this.height);
		context.fillStyle = this.color;
		context.fill();
		context.stroke();
		
		context.font      = "32px Georgia";
		context.fillStyle = "black";
        context.fillText(this.number, this.x+(this.width/3)/2, (this.y+(this.height/2)/2)+this.height/4);
	}
	
	this.clicked = function() {
		if(xPos >= this.x && xPos <= this.x + this.width) {
			if(yPos >= this.y && yPos <= this.y + this.height) {
				return true;
			}
		}
		
		return false;
	}
}
//PROTOTYPE ------

///HIGHEST ------
function setupHighest() {
	var canvas  = document.getElementById("highest-canvas");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height)
	context.canvas.width  = window.innerWidth-16; //WHY ARE THESE NUMBERS CONSISTANT ACROSS DIFFERENT PHONES
	context.canvas.height = window.innerHeight-117;
	
	//ADD RECTS TO rectList
	rectList   = []
	largestNum = 0;
	
	for(var i = 0; i < rectPositions.length; i++) {
		rectList.push(new Rect(rectPositions[i][0], rectPositions[i][1], squareSize, squareSize, 'lime', Math.floor((Math.random() * maxNum) + 1)));
	}
	
	//GET LARGEST NUMBER
	for(var i = 0; i < rectList.length; i++) {
		if(i == 0) {
			largestNum = rectList[i].number;	
		}
		
		if(i != 0 && largestNum < rectList[i].number) {
			largestNum = rectList[i].number;
		}
	}

	//DRAW SQUARES
	for(var i = 0; i < rectList.length; i++) {
		rectList[i].draw("highest-canvas");
	}
}

function handleHighestTap(event) {
	xPos = event.pageX - margin;
	yPos = (event.pageY - margin) - headerHeight; //NOT GETTING CANVAS POSITION BUT SCREEN
	
	for(var i = 0; i < rectList.length; i++) {
		if(rectList[i].clicked()) {
			if(largestNum === rectList[i].number) {
				alert(largestNum + " is correct!");
				
				setupHighest();
				
				break;
			} else {
				alert(rectList[i].number + " is wrong =[");
			}
		}
	}
}
///HIGHEST ------

///LOWEST ------
function setupLowest() {
	var canvas  = document.getElementById("lowest-canvas");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height)
	context.canvas.width  = window.innerWidth-16; //WHY ARE THESE NUMBERS CONSISTANT ACROSS DIFFERENT PHONES
	context.canvas.height = window.innerHeight-117;
	
	//ADD RECTS TO rectList
	rectList  = []
	lowestNum = 0;
	
	for(var i = 0; i < rectPositions.length; i++) {
		rectList.push(new Rect(rectPositions[i][0], rectPositions[i][1], squareSize, squareSize, 'orange', Math.floor((Math.random() * maxNum) + 1)));
	}
	
	//GET LOWEST NUMBER
	for(var i = 0; i < rectList.length; i++) {
		if(i == 0) {
			lowestNum = rectList[i].number;	
		}
		
		if(i != 0 && lowestNum > rectList[i].number) {
			lowestNum = rectList[i].number;
		}
	}

	//DRAW SQUARES
	for(var i = 0; i < rectList.length; i++) {
		rectList[i].draw("lowest-canvas");
	}
}

function handleLowestTap(event) {
	xPos = event.pageX - margin;
	yPos = (event.pageY - margin) - headerHeight;
	
	for(var i = 0; i < rectList.length; i++) {
		if(rectList[i].clicked()) {
			if(lowestNum === rectList[i].number) {
				alert(lowestNum + " is correct!");
				
				setupLowest();
				
				break;
			} else {
				alert(rectList[i].number + " is wrong =[");
			}
		}
	}
}
///LOWEST ------

///ODD ------
function setupOdd() {
	var canvas  = document.getElementById("odd-canvas");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height)
	context.canvas.width  = window.innerWidth-16; //WHY ARE THESE NUMBERS CONSISTANT ACROSS DIFFERENT PHONES
	context.canvas.height = window.innerHeight-117;
	
	//ADD RECTS TO rectList
	rectList  = []
	oddNum = 0;
	
	for(var i = 0; i < rectPositions.length; i++) {
		rectList.push(new Rect(rectPositions[i][0], rectPositions[i][1], squareSize, squareSize, 'blue', getRandomEven()));
	}
	
	//GET ODD NUMBER
	var index = Math.floor(Math.random() * rectList.length);
	
	if(rectList[index].number == 0) {
		rectList[index].number += 1
	}
	else {
		rectList[index].number -= 1;
	}
	
	oddNum = rectList[index].number;

	//DRAW SQUARES
	for(var i = 0; i < rectList.length; i++) {
		rectList[i].draw("odd-canvas");
	}
}

function handleOddTap(event) {
	xPos = event.pageX - margin;
	yPos = (event.pageY - margin) - headerHeight;
	
	for(var i = 0; i < rectList.length; i++) {
		if(rectList[i].clicked()) {
			if(oddNum === rectList[i].number) {
				alert(oddNum + " is correct!");
				
				setupOdd();
				
				break;
			} else {
				alert(rectList[i].number + " is wrong =[");
			}
		}
	}
}
///ODD ------

///EVEN ------
function setupEven() {
	var canvas  = document.getElementById("even-canvas");
	var context = canvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height)
	context.canvas.width  = window.innerWidth-16; //WHY ARE THESE NUMBERS CONSISTANT ACROSS DIFFERENT PHONES
	context.canvas.height = window.innerHeight-117;
	
	//ADD RECTS TO rectList
	rectList  = []
	evenNum   = 0;
	
	for(var i = 0; i < rectPositions.length; i++) {
		rectList.push(new Rect(rectPositions[i][0], rectPositions[i][1], squareSize, squareSize, 'red', getRandomOdd()));
	}
	
	//GET ODD NUMBER
	var index = Math.floor(Math.random() * rectList.length);
	
	rectList[index].number += 1;
	
	evenNum = rectList[index].number;

	//DRAW SQUARES
	for(var i = 0; i < rectList.length; i++) {
		rectList[i].draw("even-canvas");
	}
}

function handleEvenTap(event) {
	xPos = event.pageX - margin;
	yPos = (event.pageY - margin) - headerHeight;
	
	for(var i = 0; i < rectList.length; i++) {
		if(rectList[i].clicked()) {
			if(evenNum === rectList[i].number) {
				alert(evenNum + " is correct!");
				
				setupEven();
				
				break;
			} else {
				alert(rectList[i].number + " is wrong =[");
			}
		}
	}
}
///EVEN ------

///CUSTOM RANDOM FUNCTIONS ------
function getRandomEven() {
	var number = Math.floor((Math.random() * maxNum) + 1);
	
	if(number % 2 != 0) {
		number -= 1;
	}
	
	return number;
}

function getRandomOdd() {
	var number = Math.floor((Math.random() * maxNum) + 1);
	
	if(number % 2 == 0) {
		if(number == 0) {
			number += 1; 
		}
		else {
			number -= 1;
		}
	}
	
	return number;
}
///CUSTOM RANDOM FUNCTIONS ------