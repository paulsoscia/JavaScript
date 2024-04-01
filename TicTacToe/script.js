/*
    https://www.youtube.com/watch?v=P2TcQ3h0ipQ    
    https://github.com/beaucarnes/fcc-project-tutorials/blob/master/tictactoe/improvements/tictactoe.html
    https://jquery.com/download/
    https://www.w3schools.com/jquery/jquery_intro.asp#:~:text=%22%2C%20JavaScript%20library.-,The%20purpose%20of%20jQuery%20is%20to%20make%20it%20much%20easier,a%20single%20line%20of%20code.
*/

var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
                    [0,1,2],
                    [3,4,5],
                    [6,7,8],
                    
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    
                    [0,4,8],
                    [6,4,2]
                    ]
                    ;

const cells = document.querySelectorAll('.cell'); 
startGame();

function rgb(r, g, b){
  r = Math.floor(r);
  g = Math.floor(g);
  b = Math.floor(b);
  return ["rgb(",r,",",g,",",b,")"].join("");
}

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  x.style.backgroundColor = '';
}

function myFunctionGreen() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  
  x.style.backgroundColor = rgb(0,255,0);
}

function myFunctionBlue() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  
  x.style.backgroundColor = rgb(0,0,255);
}

function showDiv() {

    var elem = document.getElementById('id');
    elem.style.display = 'none';    // hide
    elem.style.display = 'block';   // show - use this for block elements (div, p)
    elem.style.display = 'inline';  // show - use this for inline elements (span, a)
    
    var div = document.getElementById('div_id');
    // hide
    div.style.visibility = 'hidden';
    // OR
    div.style.display = 'none';

    // show
    div.style.visibility = 'visible';
    // OR
    div.style.display = 'block';
    
    /*hide:  */  document.getElementById("myDiv").setAttribute("hidden","");
    /*unhide:*/  document.getElementById("myDiv").removeAttribute("hidden");
    
}

function startGame() {

    alert('startGame');
    document.querySelector(".endgame").style.display = "none";
    origBoard = Array.from(Array(9).keys()); 
    console.log(origBoard);
    
    for (var i =0; i < cells.length ; i++) {
        cells[i].innerText = i;
        cells[i] = "";
        
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}

//function turnClick(square) {
//    console.log(square.target.id);
//}

function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {   
        turn(square.target.id, huPlayer);
        if (! checkTie()) 
            turn(bestSpot(), aiPlayer); 
    }
}

function turn(squareId, player) {
    origBoard[squareId] = player; 
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player);
    if (gameWon) 
        gameOver(gameWon);
}

function checkWin(board, player) {

    let plays = board.reduce((a,e,i) => (e === player) ? a.concat(i) : a, []) ; 
    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player}
            break; 
        }
     }
     return gameWon; 
}

function checkTie() {
  if (emptySquares().length === 0){
    for (cell of cells) {
      cell.style.backgroundColor = "green";
      cell.removeEventListener('click',turnClick, false);
    }
    declareWinner("Tie game");
    return true;
  } 
  return false;
}

function gameOver(gameWon) {

    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor = gameWon.player == huPlayer ? "blue" : "red";
    }
    
    for (var i = 0 ; i <cells.length ; i++) {
        cells[i].removeEventListener('click', turnClick,false);
    }
}

function emptySquares() {
  return origBoard.filter((elm, i) => i===elm);
}

function bestSpot() {
	return emptySquares()[0];
}

function greet(){
  return "Hello, World!";
}
