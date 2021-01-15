const statusDisplay = document.querySelector('.gameStatus');

let gameActive=true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let computer = "easy";
const drawMessage = () => `Game ended in a draw!`;
const winningConditions = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
];

statusDisplay.innerHTML = currentPlayerTurn();
document.querySelector(".easy").style.background = "#9494b8";

function currentPlayerTurn()
{
  if (computer != "" && currentPlayer === "O")
  return "Computer is thinking...";
 else if (computer != "" && currentPlayer === "X")
  return "It's your turn";
 else
  return `It's ${currentPlayer}'s turn`;
}

function winningMessage()
{
 if (computer != "" && currentPlayer === "O")
  return "The Computer wins!";
 else if (computer != "" && currentPlayer === "X")
  return "You win!";
 else
  return `Player ${currentPlayer} has won!`;
}

function handleCellPlayed(clickedCell, clickedCellIndex)
{
 gameState[clickedCellIndex] = currentPlayer;
 clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange()
{
 currentPlayer = currentPlayer === "X" ? "O" : "X";
 statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation()
{
 let roundWon = false;
 for (let i=0; i<=7; i++)
  {
   const winCondition = winningConditions[i];
   let a = gameState[winCondition[0]];
   let b = gameState[winCondition[1]];
   let c = gameState[winCondition[2]];
   if (a === '' || b === '' || c === ''){
    continue;
   }
   if (a === b && b === c){
    roundWon = true;
    break;
   }
 }
 if (roundWon){
  statusDisplay.innerHTML = winningMessage();
  gameActive = false;
  return;
 }

 let roundDraw = !gameState.includes("");
 if (roundDraw){
  statusDisplay.innerHTML = drawMessage();
  gameActive = false;
  return;
 }
 handlePlayerChange();
}

function handleCellClick(clickedCellEvent)
{
 const clickedCell = clickedCellEvent.target;
 const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

 if (gameState[clickedCellIndex] != "" || !gameActive)
 {
  return;
 }

 handleCellPlayed(clickedCell, clickedCellIndex);
 handleResultValidation();

 if (computer != "" && gameActive)
 {
  setTimeout(function(){
   handleComputerPlayed();
   handleResultValidation();
  }, 1000);
 }
}

function handleRestartGame()
{
 gameActive = true;
 currentPlayer = "X";
 gameState = ["", "", "", "", "", "", "", "", ""];
 statusDisplay.innerHTML = currentPlayerTurn();
 document.querySelectorAll('.cell').forEach(cell=>cell.innerHTML = "");
}

function handleEasyGame()
{
 handleRestartGame();
 document.querySelector(".easy").style.background = "#9494b8";
 document.querySelector(".medium").style.background = "#ededed";
 document.querySelector(".hard").style.background = "#ededed";
 document.querySelector(".impossible").style.background = "#ededed";
 document.querySelector(".multiplayer").style.background = "#ededed";
 computer = "easy";
 statusDisplay.innerHTML = currentPlayerTurn();
}

function handleMediumGame()
{
 handleRestartGame();
 document.querySelector(".medium").style.background = "#9494b8";
 document.querySelector(".easy").style.background = "#ededed";
 document.querySelector(".hard").style.background = "#ededed";
 document.querySelector(".impossible").style.background = "#ededed";
 document.querySelector(".multiplayer").style.background = "#ededed";
 computer = "medium";
 statusDisplay.innerHTML = currentPlayerTurn();
}

function handleHardGame()
{
 handleRestartGame();
 document.querySelector(".hard").style.background = "#9494b8";
 document.querySelector(".easy").style.background = "#ededed";
 document.querySelector(".medium").style.background = "#ededed";
 document.querySelector(".impossible").style.background = "#ededed";
 document.querySelector(".multiplayer").style.background = "#ededed";
 computer = "hard";
 statusDisplay.innerHTML = currentPlayerTurn();
}

function handleImpossibleGame()
{
 handleRestartGame();
 document.querySelector(".impossible").style.background = "#9494b8";
 document.querySelector(".medium").style.background = "#ededed";
 document.querySelector(".hard").style.background = "#ededed";
 document.querySelector(".easy").style.background = "#ededed";
 document.querySelector(".multiplayer").style.background = "#ededed";
 computer = "impossible";
 statusDisplay.innerHTML = currentPlayerTurn();
}

function handleMultiplayer()
{
 handleRestartGame();
 document.querySelector(".multiplayer").style.background = "#9494b8";
 document.querySelector(".medium").style.background = "#ededed";
 document.querySelector(".hard").style.background = "#ededed";
 document.querySelector(".easy").style.background = "#ededed";
 document.querySelector(".impossible").style.background = "#ededed";
 computer = "";
 statusDisplay.innerHTML = currentPlayerTurn();
}

function handleComputerPlayed()
{
 if (computer == "easy")
  handleEasyMove();
 else if (computer == "medium")
  handleMediumMove();
 else if (computer == "hard")
  handleHardMove();
 else
  handleImpossibleMove();
}

function handleEasyMove()
{
 let random = Math.floor(Math.random()*Math.floor(9));
 if (gameState[random] == "")
 {
  let temp = '[data-cell-index="' + random + '"]';
  let clickedCell = document.querySelector(temp);
  handleCellPlayed(clickedCell, random);
 }
 else
  handleEasyMove();
}

function handleMediumMove()
{
 let forcedIndex = checkForcedMove();
 if (forcedIndex != -1)
 {
  let temp = '[data-cell-index="' + forcedIndex + '"]';
  let clickedCell = document.querySelector(temp);
  handleCellPlayed(clickedCell, forcedIndex);
 }
 else
  handleEasyMove();
}

function handleHardMove()
{
 let winningIndex = checkWinningMove();
 if (winningIndex != -1)
 {
  let temp = '[data-cell-index="' + winningIndex + '"]';
  let clickedCell = document.querySelector(temp);
  handleCellPlayed(clickedCell, winningIndex);
 }
 else
  handleMediumMove();
}

function handleImpossibleMove()
{
 let winningIndex = checkWinningMove();
 let forcedIndex = checkForcedMove();
 let otherPlayer = currentPlayer === "X" ? "O" : "X";
 if (winningIndex != -1)
 {
  let temp = '[data-cell-index="' + winningIndex + '"]';
  let clickedCell = document.querySelector(temp);
  handleCellPlayed(clickedCell, winningIndex);
 }
 else if (forcedIndex != -1)
 {
  let temp = '[data-cell-index="' + forcedIndex + '"]';
  let clickedCell = document.querySelector(temp);
  handleCellPlayed(clickedCell, forcedIndex);
 }
 else if (gameState[4] == "") //if the middle square is open, play it.
 {
  let temp = '[data-cell-index="4"]';
  let clickedCell = document.querySelector(temp);
  handleCellPlayed(clickedCell, 4);
 }
 else if (gameState[0] == otherPlayer && gameState[4] == currentPlayer && gameState[8] == otherPlayer || gameState[2] == otherPlayer && gameState[4] == currentPlayer && gameState[6] == otherPlayer) //common trap in TicTacToe
 {
  let index = -1;
  if (gameState[1] == "")
   index = 1;
  else if (gameState[3] == "")
   index = 3;
  else if (gameState[5] == "")
   index = 5;
  else if (gameState[7] == "")
   index = 7;

  if (index != -1)
  {
   let temp = '[data-cell-index="' + index + '"]';
   let clickedCell = document.querySelector(temp);
   handleCellPlayed(clickedCell, index);
  }
 }
 else if (gameState[0] == "" || gameState[2] == "" || gameState[6] == "" || gameState[8] == "")
 {
  let index = -1;
  if (gameState[0] == "")
   index = 0;
  else if (gameState[2] == "")
   index = 2;
  else if (gameState[6] == "")
   index = 6;
  else if (gameState[8] == "")
   index = 8;

  if (index != -1)
  {
   let temp = '[data-cell-index="' + index + '"]';
   let clickedCell = document.querySelector(temp);
   handleCellPlayed(clickedCell, index);
  }
 }
 else
  handleEasyMove();
}

function checkForcedMove()
{
 let forcedMove = false;
 for (let i=0; i<=7; i++)
 {
   let otherPlayer = currentPlayer === "X" ? "O" : "X";
   const winCondition = winningConditions[i];
   let a = gameState[winCondition[0]];
   let b = gameState[winCondition[1]];
   let c = gameState[winCondition[2]];
   if (a === b && a === otherPlayer && c === ""){
    forcedMove = true;
    return winCondition[2];
   }
   else if (a === c && a === otherPlayer && b === ""){
    forcedMove = true;
    return winCondition[1];
   }
   else if (b === c && b === otherPlayer && a === ""){
    forcedMove = true;
    return winCondition[0];
   }
 }
 return -1;
}

function checkWinningMove()
{
 let winningMove = false;
 for (let i=0; i<=7; i++)
 {
   const winCondition = winningConditions[i];
   let a = gameState[winCondition[0]];
   let b = gameState[winCondition[1]];
   let c = gameState[winCondition[2]];
   if (a === b && a === currentPlayer && c === ""){
    winningMove = true;
    return winCondition[2];
   }
   else if (a === c && a === currentPlayer && b === ""){
    winningMove = true;
    return winCondition[1];
   }
   else if (b === c && b === currentPlayer && a === ""){
    winningMove = true;
    return winCondition[0];
   }
 }
 return -1;
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);
document.querySelector('.easy').addEventListener('click', handleEasyGame);
document.querySelector('.medium').addEventListener('click', handleMediumGame);
document.querySelector('.hard').addEventListener('click', handleHardGame);
document.querySelector('.impossible').addEventListener('click', handleImpossibleGame);
document.querySelector('.multiplayer').addEventListener('click', handleMultiplayer);
