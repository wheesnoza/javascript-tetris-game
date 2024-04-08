import "./style.css";
const canvas = document.getElementById("board");
const context = canvas.getContext("2d");

const animation = (callback, ms) => {
  let count = 0;
  let prevTime = 0;

  function draw(time) {
    const elapsedTime = time - prevTime;
    if (elapsedTime >= ms) {
      count = 0;
      prevTime = time;
      callback();
    }

    count++;
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
};

const size = 30;

const blocks = [
  [
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ],
  [[0, 0, 0, 1, 1, 1, 1, 0, 0, 0]],
  [
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  ],
];

const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 0, 2, 0, 0, 0, 0, 0],
  [2, 2, 0, 0, 2, 2, 2, 2, 2, 2], // 19
];

const animateFigure = () => {
  for (let i = board.length - 1; i >= 0; i--) {
    if (!board[i].includes(1)) continue;
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 1) {
        if (i + 1 > 19) {
          board[i][j] = 2;
          break;
        }
        if (board[i + 1][j] === 2) {
          board[i][j] = 2;
          break;
        }
        board[i][j] = 0;
        board[i + 1][j] = 1;
      }
    }
  }
};

const drawBlocks = () => {
  board.forEach((line, y) => {
    line.forEach((element, x) => {
      if (element === 1 || element === 2) {
        context.fillStyle = "gray";
        context.fillRect(x * size, y * size, size, size);
      }
    });
  });
};

const inline = () => {
  board.forEach((block, index) => {
    if (block.every((b) => b === 2)) {
      board.splice(index, 1);
      board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  });
  appendBlock();
};

const appendBlock = () => {
  const block = blocks[Math.floor(Math.random() * blocks.length)];
  block.forEach((b) => {
    board.shift();
    board.unshift(b);
  });
};

animation(() => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  animateFigure();
  drawBlocks();
  inline();
}, 200);
