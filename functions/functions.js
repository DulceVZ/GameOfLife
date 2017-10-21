var high = 10;
var width = 10;
var timer;
var state;
var speed=1000;

function matrix(){	//Start board
	state = [];
	for(var column=0; column<width; column++) {
	    state[column] = [];
	    for(var row=0; row<high; row++) {
	        state[column][row] = false;
	    }
	}
}

function newBoard(){	//Draw a new game board
	document.getElementById("board").innerHTML="";
	for(var row=0;row<high;row++){
		document.getElementById("board").innerHTML+="<tr id="+row+"></tr>";
		for(var column=0;column<width;column++)
			document.getElementById(row).innerHTML+="<td class='dead' id=cell"+column+"x"+row+"></td> ";
	}
}
	
function changeSize(){	//Change matrix size
	high = parseInt(document.getElementById('high').value);
	width = parseInt(document.getElementById('width').value);
	if(width>1 && high>1){
		matrix();
		newBoard();
	}
	else
		alert("Please, introduce another number to generate the matrix");
}

function fill(){	//Fill the matrix
	for(var row=0;row<high;row++)
		for(var column=0;column<width;column++){
			document.getElementById("cell"+column+"x"+row).className = Math.random() > 0.7 ? "alive" : "dead";
		}
}

function start(){	//Start game
    timer = setInterval(nextStep, speed);            
}

function nextStep(){	//Execution step by step
	matrix();
	for(var row=0;row<high;row++)
		for(var column=0;column<width;column++){
			var neighbours=environment(column,row);
			var cellState = document.getElementById("cell"+column+"x"+row).className;
			switch (neighbours){
				case 2:
					if(cellState == "alive")
						state[column][row]="alive";
					else
						state[column][row]="dead";
					break;
				case 3:
						state[column][row]="alive";
					break;
				default:
					state[column][row]="dead";
				break;
			}		
		}
	changeState();
}

function stop(){	//Stop game
    clearTimeout(timer);                      
}

function clean(){	//Clean matrix		
	for(var row=0;row<high;row++)
		for(var column=0;column<width;column++){
			document.getElementById("cell"+column+"x"+row).className="dead";
		}			
	matrix();
}

function changeState(){	//Change cell status
	for(var row=0;row<high;row++)
		for(var column=0;column<width;column++)
			document.getElementById("cell"+column+"x"+row).className=state[column][row];	
}

function environment(column,row){		//Neighbors count
	var neighbours=0;

	if(row>=1 && column!=0)	//Up-left
		if(document.getElementById("cell"+(column-1)+"x"+(row-1)).className == "alive")
			neighbours++;
	if(row>=1)	//Up
		if(document.getElementById("cell"+column+"x"+(row-1)).className == "alive")
			neighbours++;
	if(row>=1 && column<width-1)	//Up-right
		if(document.getElementById("cell"+(column+1)+"x"+(row-1)).className == "alive")
			neighbours++;
	if(column<width-1)	//Right
		if(document.getElementById("cell"+(column+1)+"x"+row).className == "alive")
			neighbours++;
	if(row<high-1 && column<width-1)	//Down-right
		if(document.getElementById("cell"+(column+1)+"x"+(row+1)).className == "alive")
			neighbours++;
	if(row<high-1)	//Down
		if(document.getElementById("cell"+column+"x"+(row+1)).className == "alive")
			neighbours++;
	if(row<high-1 && column>0)	//Down-left
		if(document.getElementById("cell"+(column-1)+"x"+(row+1)).className == "alive")
			neighbours++;
	if(column>=1)	//Left
		if(document.getElementById("cell"+(column-1)+"x"+row).className == "alive")
			neighbours++;
	
	return neighbours;
}
