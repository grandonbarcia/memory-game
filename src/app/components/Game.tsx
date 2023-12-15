'use client';

import { useState, useEffect } from 'react';

const nums = [
  [1, 4, 4, 9],
  [7, 6, 3, 8],
  [6, 3, 5, 1],
  [7, 9, 5, 8],
];

const display = [
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
  [false, false, false, false],
];

export default function Game() {
  const [data, setData] = useState([...nums]);
  const [show, setShow] = useState([...display]);
  const [clicked, setClicked] = useState(0);
  const [first, setFirst] = useState<number[]>([]);
  const [second, setSecond] = useState<number[]>([]);

  function nextTurn() {
    setClicked(0);
    setFirst([]);
    setSecond([]);
  }

  function handleClick(colIdx: number, rowIdx: number) {
    if (clicked < 2) {
      let cloneArr = [...show];
      cloneArr[colIdx][rowIdx] = true;
      setShow([...cloneArr]);
      setClicked(clicked + 1);
      if (first.length === 0) {
        setFirst([colIdx, rowIdx]);
      } else {
        setSecond([colIdx, rowIdx]);
      }
    }
  }

  useEffect(() => {
    if (clicked === 2) {
      const timer = setTimeout(() => {
        const firstClick = data[first[0]][first[1]];
        const secondClick = data[second[0]][second[1]];

        if (firstClick !== secondClick) {
          let cloneArr = [...show];
          cloneArr[first[0]][first[1]] = false;
          cloneArr[second[0]][second[1]] = false;
          setShow([...cloneArr]);
          nextTurn();
        } else {
          nextTurn();
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [clicked]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24 gap-10">
        <div className="flex w-3/6 justify-between">
          <div>memory game</div>
          <div className="flex w-1/6 justify-between">
            <div>Restart</div>
            <div>New Game</div>
          </div>
        </div>
        <div className="flex w-3/6 justify-center items-center flex-col gap-5 ">
          {data.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex gap-3 w-full text-center justify-center items-center"
            >
              {row.map((col, colIdx) => (
                <div
                  key={colIdx}
                  className="flex justify-center items-center w-32 h-32"
                  onClick={() => handleClick(rowIdx, colIdx)}
                >
                  {show[rowIdx][colIdx] ? (
                    col
                  ) : (
                    <div className="h-full w-full bg-red-400 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex gap-5">
          <div>Time 0:00</div>
          <div>Moves 0 </div>
        </div>
      </main>
    </>
  );
}
