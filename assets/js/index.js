import Board from "./board.js";

game();

function game() {
  let board = new Board(); // creates a new game board

  // Examine the grid of the game board in the browser console.
  // Create the UI of the game using HTML elements based on this grid.
  console.log(board.grid);

  const gameBoard = document.createElement("div");
  gameBoard.classList.add("gameBoardClass");

  const winMessage = document.createElement("div");

  const resetButton = document.createElement("button");
  resetButton.innerText = "Reset Game";
  resetButton.style.fontSize = "18px";
  resetButton.style.padding = "4px 10px";
  resetButton.style.marginBottom = "15px";

  let boxId = 1;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const newBox = document.createElement("div");
      // console.log(row, col);
      newBox.setAttribute("id", `box-${boxId}`);
      newBox.setAttribute("data-row", row);
      newBox.setAttribute("data-col", col);
      newBox.style.border = "1px solid";
      gameBoard.append(newBox);
      boxId++;
    }
  }

  gameBoard.addEventListener("click", function event(e) {
    const boxSelection = e.target;
    // console.log(boxSelection);
    const row = boxSelection.getAttribute("data-row");
    // console.log(row);
    const col = boxSelection.getAttribute("data-col");
    const guess = board.makeHit(row, col);

    if (guess === null) {
      boxSelection.style.backgroundColor = "red";
    } else if (typeof guess === "number") {
      boxSelection.style.backgroundColor = "green";
      boxSelection.innerText = guess;
      boxSelection.style.fontSize = "30px";
      boxSelection.style.display = "flex";
      boxSelection.style.justifyContent = "center";
      boxSelection.style.alignItems = "center";

      // const currBox = document.getElementById(`box-${currBoxId}`);
    }

    if (board.isGameOver()) {
      gameBoard.removeEventListener("click", event);
      winMessage.innerText = "YOU WIN!";
      winMessage.style.fontSize = "30px";
    }
  });

  resetButton.addEventListener("click", () => {
    gameBoard.remove();
    resetButton.remove();
    winMessage.remove();
    game();
  });

  document.body.append(winMessage);
  document.body.append(resetButton);
  document.body.append(gameBoard);
}

