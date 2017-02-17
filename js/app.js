//load start screen
var start = document.getElementById("start");
var board = document.getElementById("board");
var finish = document.getElementById("finish");
var boardBoxes = document.getElementsByClassName("box");
var startButton = document.getElementById("startButton");
var oBox = document.getElementById("player1");
var xBox = document.getElementById("player2");

board.classList.add("hidden");
finish.classList.add("hidden");

//create player prototype
//"E" stands for empty board cell

//create game prototype
//board state
var game = { 
  board: ["E", "E", "E", "E", "E", "E", "E", "E", "E"],
  turn: "x",
  status: "beginning",
  xName: "",
  oName: "",
  advanceTo: function(state){
    if(state ==="start"){
      this.board = ["E", "E", "E", "E", "E", "E", "E", "E", "E"];
      this.status = "running";
      this.turn = "x";
      this.xName = prompt("Player 1, enter your name:");
      this.oName = prompt("Player 2, enter your name:");
      switchViewTo("newGame");
    }
    else if(state === "end") {
        this.status = "ended";
        if(result === "X-won")
          //X won
          switchViewTo("won");
        else if(result === "O-won")
          //X lost
          switchViewTo("lost");
        else
          //it's a draw
          switchViewTo("draw");
    }
    else {
      //the game is still running
      if(this.turn === "x") {
        this.turn = "o";
        switchViewTo("oTurn");
      }
      else {
        this.turn = "x";
        switchViewTo("xTurn");
      }
    }
  }
};

//current player has .active added to li
//when current player hovers, add background-image to tile
//on click, if tile empty, add class box-filled-1 (o) or box-filled-2 (x)

//game end when 3 symbols in a row vertically, horizontally, or diagonally
var isFinished = function(){        
  var B = this.board;
  //check rows
  for(var i = 0; i <= 6; i = i + 3) {
      if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
          this.result = B[i] + "-won"; //update the state result
          return true;
      }
  }
  //check columns
  for(var i = 0; i <= 2 ; i++) {
      if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
          this.result = B[i] + "-won"; //update the state result
          return true;
      }
  }
  //check diagonals
  for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
      if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
          this.result = B[i] + "-won"; //update the state result
          return true;
      }
  }
};
  
var switchViewTo = function(view){
  if (view === "newGame"){
    start.classList.add("hidden");
    finish.classList.add("hidden");
    board.classList.remove("hidden");
    oBox.classList.remove("active");
    xBox.classList.add("active");
    //update xName
    //update oName
  }else if (view === "oTurn"){
    console.log("o turn");
    xBox.classList.remove("active");
    oBox.classList.add("active");
  }else if (view === "xTurn"){
    console.log("x turn");
    xBox.classList.remove("active");
    oBox.classList.add("active");
  }

  //hide board
  //show end screen - winner or tie
  //screen-win-one for p1 screen-win-two for p2
  //display winner name
};

var scoring = function(){
  //if player wins, return +10
  //else if opponent wins, return -10
  //else return 0
}

//clicking new game restarts game

//
var hover = function(){
  if (game.turn === "x" && this.className != 'box box-filled-2' && this.className != 'box box-filled-1') {
    this.classList.add('xSVG');
  }
  else if (game.turn === "o" && this.className != 'box box-filled-2' && this.className != 'box box-filled-1') {
    this.classList.add('oSVG');
  }
};

var hoverOut = function(){
  if (this.className != 'box-filled-2' || this.className != 'box-filled-1') {
    this.classList.remove('xSVG');
    this.classList.remove('oSVG');
  }
};

var clickBox = function(){
  if (game.turn === "x") {
    if (this.className != 'box box-filled-2' && this.className != 'box box-filled-1') {
        // add the symbol by adding the CSS class
        this.classList.add('box-filled-2');
        // remove SVG hover so user cannot click same box again without mousing out
        this.classList.remove('xSVG');
        //update board
        var i = 0;
        var elem = this.previousElementSibling;
        while( elem != null ){
          elem = elem.previousElementSibling;
          i++;
        }
        console.log(i);
        game.board[i] = "x";
        // change turn
        game.advanceTo();
    }
  } else if (game.turn === "o") {
      if (this.className != 'box box-filled-1' && this.className != 'box box-filled-2') {
          // add the symbol by adding the CSS class
          this.classList.add('box-filled-1');
          // remove SVG hover so user cannot click same box again without mousing out
          this.classList.remove('oSVG');
          //update board
          var i = 0;
          var elem = this.previousElementSibling;
          while( elem != null ){
            elem = elem.previousElementSibling;
            i++;
          }
          console.log(i);
          game.board[i] = "o";
          // // switch active players
          game.advanceTo();
      }
  }
};
/*----------------
Event Listeners
----------------*/
startButton.addEventListener("click", function(){
  game.advanceTo("start");
});

for (var i = 0; i < boardBoxes.length; i++) {
        var box = boardBoxes[i];
        box.addEventListener('mouseover', hover, false);
        box.addEventListener('mouseout', hoverOut, false);
        box.addEventListener('click', clickBox, false);
    }