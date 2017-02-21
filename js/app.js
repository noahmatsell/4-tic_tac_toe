//load start screen
var start = document.getElementById("start");
var board = document.getElementById("board");
var finish = document.getElementById("finish");
var boardBoxes = document.getElementsByClassName("box");
var startButton = document.getElementById("startButton");
var oBox = document.getElementById("player1");
var xBox = document.getElementById("player2");
var newGame = document.getElementById("newGame");

board.classList.add("hidden");
finish.classList.add("hidden");
//update xName
xBox.insertAdjacentHTML('beforeend', "<div class='displayName'></div>");
//update oName
oBox.insertAdjacentHTML('beforeend', "<div class='displayName'></div>");

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
    else if(isFinished()) {
        this.status = "ended";
        switchViewTo("end");
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
  var B = game.board;
  //check rows
  for(var i = 0; i <= 6; i = i + 3) {
      if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
          game.status = "win";
          return true;
      }
  }
  //check columns
  for(var i = 0; i <= 2 ; i++) {
      if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
          game.status = "win";
          return true;
      }
  }
  //check diagonals
  for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
      if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
          game.status = "win";
          return true;
      }
  }
  //draw
  if (B[0] !== "E" && B[1] !== "E" && B[2] !== "E" && B[3] !== "E" && B[4] !== "E" && B[5] !== "E"){
      game.status = "draw";
      return true;
  }
};
  
var switchViewTo = function(view){
  
  if (view === "newGame"){
    start.classList.add("hidden");
    finish.classList.add("hidden");
    board.classList.remove("hidden");
    oBox.classList.remove("active");
    xBox.classList.add("active");
    //remove box filled classes
    for (var i = 0; i < boardBoxes.length; i++) {
        var box = boardBoxes[i];
        box.classList.remove("box-filled-1");
        box.classList.remove("box-filled-2");
    }
    //remove old names
    xBox.querySelector(".displayName").textContent = game.xName;
    oBox.querySelector(".displayName").textContent = game.oName;
    
  }else if (view === "oTurn"){
    console.log("o turn");
    xBox.classList.remove("active");
    oBox.classList.add("active");
  }else if (view === "xTurn"){
    console.log("x turn");
    oBox.classList.remove("active");
    xBox.classList.add("active");
  }else if (view === "end"){
    start.classList.add("hidden");
    board.classList.add("hidden");
    finish.classList.remove("hidden");

    if(game.status === "draw"){
      finish.classList.remove("screen-win-one");
      finish.classList.remove("screen-win-two");
      finish.classList.add("screen-win-tie");
      finish.querySelector("header .message").textContent = "It's a draw!";
    }else{
      var winner;
      if (game.turn === "x"){
        winner = game.xName;
        finish.classList.remove("screen-win-tie");
        finish.classList.remove("screen-win-one");
        finish.classList.add("screen-win-two");
      }else{
        winner = game.oName;
        finish.classList.remove("screen-win-tie");
        finish.classList.remove("screen-win-two");
        finish.classList.add("screen-win-one");
      }
      finish.querySelector("header .message").textContent = game.turn + " wins! Congrats "+winner+"!";
    }

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
        var iBox = 0;
        var elem = this.previousElementSibling;
        while( elem !== null ){
          elem = elem.previousElementSibling;
          iBox++;
        }
        console.log(i);
        game.board[iBox] = "x";
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
          var iBox2 = 0;
          var elem = this.previousElementSibling;
          while( elem != null ){
            elem = elem.previousElementSibling;
            iBox2++;
          }
          console.log(i);
          game.board[iBox2] = "o";
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

newGame.addEventListener("click", function(){
  game.advanceTo("start");
});

for (var i = 0; i < boardBoxes.length; i++) {
        var box = boardBoxes[i];
        box.addEventListener('mouseover', hover, false);
        box.addEventListener('mouseout', hoverOut, false);
        box.addEventListener('click', clickBox, false);
    }