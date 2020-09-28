const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const WINNING_COMBINATIONS = [
  [1, 2, 3, 4, 0],
  [6, 7, 8, 9, 5],
  [11, 12, 13, 14, 10],
  [16, 17, 18, 19, 15],
  [21, 22, 23, 24, 20],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [20, 16, 12, 8, 4]
];

const cellElements = document.querySelectorAll("[data-cell]");
let circleTurn;

cellElements.forEach((cell) => {
  cell.addEventListener("click", handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }

  function endGame(draw) {
    if (draw) {
      winningMessageTextElement.innerText = "Draw!";
    } else {
      winningMessageTextElement.innerText = `${
        circleTurn ? "O's" : "X's"
      } Wins!`;
    }
    winningMessageElement.classList.add("show");
  }

  function isDraw() {
    return [...cellElements].every((cell) => {
      return (
        cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
      );
    });
  }

  function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
  }

  function swapTurns() {
    circleTurn = !circleTurn;
  }

  function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
      return combination.every((index) => {
        return cellElements[index].classList.contains(currentClass);
      });
    });
  }
}
