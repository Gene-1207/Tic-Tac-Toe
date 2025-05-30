import React, { useState } from "react";

function Square({ value, onClick }) {
  return (
    <button
      style={{
        width: 60,
        height: 60,
        fontSize: 24,
        margin: 2,
        background: "#eee",
        border: "1px solid #999",
      }}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every(Boolean)) {
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Tic-Tac-Toe</h1>
      <div>{status}</div>
      <div style={{ display: "inline-block" }}>
        {[0, 3, 6].map((row) => (
          <div key={row} style={{ display: "flex" }}>
            {[0, 1, 2].map((col) => {
              const idx = row + col;
              return (
                <Square
                  key={idx}
                  value={squares[idx]}
                  onClick={() => handleClick(idx)}
                />
              );
            })}
          </div>
        ))}
      </div>
      <br />
      <button
        style={{ marginTop: 20 }}
        onClick={() => {
          setSquares(Array(9).fill(null));
          setXIsNext(true);
        }}
      >
        Restart
      </button>
    </div>
  );
}
