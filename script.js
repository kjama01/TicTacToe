const startscreen = document.getElementById("startscreen");
const gameInfo = document.getElementById("gameInfo");

setTimeout(() => {
  if (startscreen) {
    startscreen.style.opacity = "0";
    setTimeout(() => {
      startscreen.style.display = "none";
    }, 1000);
  }
}, 2000);
// function changeAudio(src) {
//   const audio = document.getElementById("backgroundAudio");
//   const audioSource = document.getElementById("audioSource");
//   audioSource.src = src;
//   audio.load();
//   setTimeout(() => {
//     audio.play();
//   }, 200);
// }
// document.addEventListener("DOMContentLoaded", () => {
//   const audioIcon = document.getElementById("audioIcon");
//   const audio = document.getElementById("backgroundAudio");

//   audioIcon.addEventListener("click", () => {
//     if (audio.muted) {
//       audio.muted = false;
//       audioIcon.src = "/img/mute-sound.png";
//     } else {
//       audio.muted = true;
//       audioIcon.src = "/img/enable-sound.png";
//     }
//   });
// });
document
  .querySelectorAll(".select")
  .forEach((container) => container.addEventListener("click", handleSelection));
function handleSelection(event) {
  if (event.target.tagName === "BUTTON") {
    const container = event.currentTarget;
    container.querySelectorAll("button").forEach((btn) => {
      btn.classList.remove("selected");
    });
    event.target.classList.add("selected");
  }
}

const gameStartInfo = document.getElementById("gameStartInfo");
document.getElementById("startMenu").addEventListener("click", () => {
  let gameMode = document.querySelector(".gamemode-select .selected");
  let gameInfoMessage = gameStartInfo.querySelector("h2");
  if (!gameMode) {
    gameInfoMessage.textContent = "You need to choose your side padawan!";
    return;
  }
  let selectedMode = gameMode.dataset.mode;
  if (selectedMode === "1") {
    gameInfoMessage.textContent = "";
    gameMenu(1);
  } else {
    gameInfoMessage.textContent = "";
    gameMenu(2);
  }
});

function gameMenu(opt) {
  document.querySelector(".gamemode-select").classList.add("hidden");
  document.getElementById("startMenu").classList.add("hidden");
  gameStartInfo.querySelector("h1").textContent = "May the force be with you!";

  const gameElements = document.querySelectorAll("#left, #right, #startGame");

  if (opt === 1) {
    gameElements.forEach((el) => {
      el.classList.remove("hidden");
    });
  } else {
    document.getElementById("left").classList.remove("hidden");
    document.getElementById("startGameComputer").classList.remove("hidden");
    const right = document.getElementById("right");
    right.classList.remove("hidden");
    right.classList.add("computer-mode");
    const computerName = document.createElement("h1");
    computerName.textContent = "Computer";
    const computerAvatar = document.createElement("button");
    const computerWeapon = document.createElement("button");
    computerWeapon.setAttribute("data-weapon", "5");
    computerAvatar.setAttribute("data-avatar", "6");
    right.append(computerAvatar, computerName, computerWeapon);
  }
}
//////////////////////////////
const gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let gameMode = null;
let gameOver = false;
function handleError(element) {
  if (!element.classList.contains("error-shake")) {
    element.classList.add("error-shake");
    setTimeout(() => {
      element.classList.remove("error-shake");
    }, 1000);
  }
}
document.getElementById("startGameComputer").addEventListener("click", () => {
  let gameInfoMessage = gameStartInfo.querySelector("h2");
  let hasError = false;
  const players = [
    {
      name: document.getElementById("playerone-name"),
      avatar: document.querySelector(".left-avatar-select .selected"),
      weapon: document.querySelector(".left-weapon-select .selected"),
      errorName: document.querySelector(".first-player h2"),
      errorAvatar: document.querySelector(".left-player-avatar h3"),
      errorWeapon: document.querySelector(".left-player-weapon h3"),
    },
    {
      name: { value: "Computer" },
      avatar: { dataset: { avatar: "6" } },
      weapon: { dataset: { weapon: "5" } },
    },
  ];
  const player = players[0];
  if (!player.name.checkValidity()) {
    handleError(player.errorName);
    hasError = true;
  }
  if (!player.avatar) {
    handleError(player.errorAvatar);
    hasError = true;
  }
  if (!player.weapon) {
    handleError(player.errorWeapon);
    hasError = true;
  }
  if (hasError) {
    gameInfoMessage.textContent = "Fill required data young Padawan";
    return;
  }
  gameStart(players);
  board.style.display = "grid";
  squares();
  gameStartInfo.style.display = "none";
});
document.getElementById("startGame").addEventListener("click", () => {
  gameMode = "player";
  let gameInfoMessage = gameStartInfo.querySelector("h2");
  let hasError = false;
  const players = [
    {
      name: document.getElementById("playerone-name"),
      avatar: document.querySelector(".left-avatar-select .selected"),
      weapon: document.querySelector(".left-weapon-select .selected"),
      errorName: document.querySelector(".first-player h2"),
      errorAvatar: document.querySelector(".left-player-avatar h3"),
      errorWeapon: document.querySelector(".left-player-weapon h3"),
    },
    {
      name: document.getElementById("playertwo-name"),
      avatar: document.querySelector(".right-avatar-select .selected"),
      weapon: document.querySelector(".right-weapon-select .selected"),
      errorName: document.querySelector(".second-player h2"),
      errorAvatar: document.querySelector(".right-player-avatar h3"),
      errorWeapon: document.querySelector(".right-player-weapon h3"),
    },
  ];
  players.forEach((player) => {
    if (!player.name.checkValidity()) {
      handleError(player.errorName);
      hasError = true;
    }
    if (!player.avatar) {
      handleError(player.errorAvatar);
      hasError = true;
    }
    if (!player.weapon) {
      handleError(player.errorWeapon);
      hasError = true;
    }
  });
  if (hasError) {
    gameInfoMessage.textContent = "Fill required data young Padawan";
    return;
  }
  gameStart(players);
  board.style.display = "grid";
  squares();
  gameStartInfo.style.display = "none";
});
function gameStart(players) {
  document.getElementById("left").classList.add("left-removed");
  document.getElementById("right").classList.add("right-removed");
  document.getElementById("content").style.boxShadow = "none";
  document.getElementById("main").style.backdropFilter = "blur(10px)";
  // changeAudio("/mp3/battle.mp3");
  setTimeout(() => {
    document.getElementById("top").classList.add("top-slide");
    document.getElementById("main").style.borderTopLeftRadius = "0px";
    document.getElementById("main").style.borderTopRightRadius = "0px";
  }, 1000);
  const leftAvatar = document.getElementById("left-avatar-selected");
  const leftName = document.getElementById("left-name-selected");
  const leftWeapon = document.getElementById("left-weapon-selected");
  const rightAvatar = document.getElementById("right-avatar-selected");
  const rightName = document.getElementById("right-name-selected");
  const rightWeapon = document.getElementById("right-weapon-selected");
  leftAvatar.setAttribute("data-avatar", players[0].avatar.dataset.avatar);
  leftName.textContent = players[0].name.value;
  leftName.classList.add("active-player");
  leftWeapon.setAttribute("data-weapon", players[0].weapon.dataset.weapon);

  rightAvatar.setAttribute("data-avatar", players[1].avatar.dataset.avatar);
  rightName.textContent = players[1].name.value;
  rightWeapon.setAttribute("data-weapon", players[1].weapon.dataset.weapon);
  rightWeapon.style.transform = "scaleX(-1)";
  const board = document.getElementById("board");
  board.style.display = "grid";
  gameInfo.style.display = "block";
  gameInfo.textContent =
    document.querySelector(".active-player").textContent + " 's turn";
}
function squares() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.dataset.row = i;
      square.dataset.col = j;
      board.appendChild(square);
    }
  }
}
////////////////////////////
board.addEventListener("click", (e) => {
  if (gameOver) return;
  if (gameMode === "player") {
    game.changeTurn(e);
  } else {
    gameAI.changeTurn(e);
  }
});
const gameAI = (() => {
  let userMark;
  let computerMark;
  let turn;
  let leftPlayer;
  function init() {
    userMark = document.getElementById("left-weapon-selected").dataset.weapon;
    leftPlayer = document.getElementById("left-name-selected");
    computerMark = "5";
    turn = userMark;
  }
  function changeTurn(e) {
    if (!userMark) {
      init();
    }

    if (e.target.classList.contains("square")) {
      let row = e.target.dataset.row;
      let col = e.target.dataset.col;
      if (gameBoard[row][col] !== "") {
        return;
      }
      if (turn === userMark) {
        leftPlayer.classList.add("active-player");
        actualPlayer = document.querySelector(".active-player").textContent;
        if (!gameBoard[row][col]) {
          gameBoard[row][col] = turn;
          e.target.setAttribute("data-weapon", turn);
        }
        let result = isWinner();
        if (result === userMark) {
          endGame();
          return;
        } else if (result === "tie") {
          endGameWithTie();
          return;
        }
        turn = computerMark;
        setTimeout(computerMove, 300);
      }
    }
  }
  function computerMove() {
    let move = bestMove();
    let row = Math.floor(move / 3);
    let col = move % 3;

    gameBoard[row][col] = computerMark;
    let square = document.querySelector(
      `.square[data-row="${row}"][data-col="${col}"]`
    );
    square.setAttribute("data-weapon", computerMark);

    let result = isWinner();
    if (result === computerMark) {
      endGameWithComputer();
      return;
    } else if (result === "tie") {
      endGameWithTie();
      return;
    }

    turn = userMark;
  }

  function bestMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard[i][j] === "") {
          gameBoard[i][j] = computerMark;
          let score = minimax(gameBoard, 0, false);
          gameBoard[i][j] = "";

          if (score > bestScore) {
            bestScore = score;
            move = i * 3 + j;
          }
        }
      }
    }

    return move;
  }

  function minimax(board, depth, isMaximizing) {
    let result = isWinner();

    if (result === computerMark) return 10 - depth;
    if (result === userMark) return depth - 10;
    if (result === "tie") return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = computerMark;
            let score = minimax(board, depth + 1, false);
            board[i][j] = "";
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            board[i][j] = userMark;
            let score = minimax(board, depth + 1, true);
            board[i][j] = "";
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  return { changeTurn };
})();

function endGameWithTie() {
  let userTurn = document.querySelector(".active-player");
  userTurn.classList.remove("active-player");
  document.querySelector("#left-name-selected").style.color = "#0080ff";
  document.querySelector("#right-name-selected").style.color = "#0080ff";
  gameOver = true;
  gameInfo.innerHTML = `<span class="winner-text">It's a tie!</span>`;
}

function endGameWithComputer() {
  let userTurn = document.querySelector(".active-player");
  userTurn.classList.remove("active-player");
  gameOver = true;
  document.querySelector("#right-name-selected").style.color = "#0080ff";
  gameInfo.innerHTML = `<span class="winner-text">Separatists </span>win the duel!`;
}
const game = (() => {
  let firstMark;
  let secondMark;
  let turn;
  let actualPlayer;
  let leftPlayer;
  let rightPlayer;
  function init() {
    firstMark = document.getElementById("left-weapon-selected").dataset.weapon;
    secondMark = document.getElementById("right-weapon-selected").dataset
      .weapon;
    leftPlayer = document.getElementById("left-name-selected");
    rightPlayer = document.getElementById("right-name-selected");
    turn = secondMark;
  }
  function changeTurn(e) {
    if (!firstMark || !secondMark) {
      init();
    }
    if (e.target.classList.contains("square")) {
      let row = e.target.dataset.row;
      let col = e.target.dataset.col;

      if (gameBoard[row][col] !== "") {
        return;
      }
      turn = turn === firstMark ? secondMark : firstMark;
      if (!gameBoard[row][col]) {
        gameBoard[row][col] = turn;
        e.target.setAttribute("data-weapon", turn);
      }
    }
    if (isWinner()) endGame();
    if (!gameOver) {
      leftPlayer.classList.toggle("active-player");
      rightPlayer.classList.toggle("active-player");
      actualPlayer = document.querySelector(".active-player").textContent;
      gameInfo.textContent = actualPlayer + " 's turn";
    }
  }
  function getTurn() {
    return actualPlayer;
  }
  return { changeTurn, getTurn };
})();

///////////////////////////////

function isWinner() {
  //row
  for (let i = 0; i < 3; i++)
    if (
      gameBoard[i][0] !== "" &&
      gameBoard[i][0] === gameBoard[i][1] &&
      gameBoard[i][1] === gameBoard[i][2]
    ) {
      return gameBoard[i][0];
    }
  //column
  for (let i = 0; i < 3; i++)
    if (
      gameBoard[0][i] !== "" &&
      gameBoard[0][i] === gameBoard[1][i] &&
      gameBoard[1][i] === gameBoard[2][i]
    ) {
      return gameBoard[0][i];
    }
  //diagonal
  if (
    gameBoard[0][0] !== "" &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][2]
  ) {
    return gameBoard[0][0];
  }
  if (
    gameBoard[0][2] !== "" &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[1][1] === gameBoard[2][0]
  ) {
    return gameBoard[0][2];
  }
  if (isBoardFull()) {
    return "tie";
  }
  return null;
}
function isBoardFull() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (gameBoard[i][j] === "") {
        return false;
      }
    }
  }
  return true;
}

//////////////////////////////////
function endGame() {
  let win = document.querySelector(".active-player");
  win.style.color = "#0080ff";
  win.classList.remove("active-player");
  gameOver = true;
  const winner = game.getTurn();
  gameInfo.innerHTML = `<span class="winner-text">${winner}</span> 's win the duel!`;
}
document.querySelector(".fa-arrows-rotate").addEventListener("click", () => {
  window.location.reload();
});
