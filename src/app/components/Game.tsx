'use client';

import { useState, useEffect, use } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import ModalButton from './Modal';
import Timer from './Timer';

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

export default function Game({
  rules,
  status,
}: {
  rules: object;
  status: string;
}) {
  const [data, setData] = useState([...nums]);
  const [show, setShow] = useState([...display]);
  const [clicked, setClicked] = useState(0);
  const [first, setFirst] = useState<number[]>([]);
  const [second, setSecond] = useState<number[]>([]);

  const [timer, setTimer] = useState(0);
  const [moves, setMoves] = useState(0);

  const windowSize = useWindowSize();

  useEffect(() => {
    let interval: any;
    console.log('Start', status);
    if (status === 'game') {
      interval = setInterval(() => {
        setTimer((prevTime: number) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(timer);
  }, [timer]);

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

  function RegularButton() {
    return (
      <div>
        <button
          className="py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none 
          bg-Sage
         rounded-full border border-gray-200 hover:bg-gray-100 hover:text-Beige focus:z-10 focus:ring-4 focus:ring-gray-200 "
        >
          restart
        </button>
        <button
          className="py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none 
          
         rounded-full border border-gray-200 hover:bg-gray-100 hover:text-Beige focus:z-10 focus:ring-4 focus:ring-gray-200 "
        >
          new game
        </button>
      </div>
    );
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
      <div className="h-screen w-screen flex flex-col items-center justify-center ">
        <div className="flex w-4/5 md:w-2/3 lg:w-2/3 items-center justify-between">
          <div className="text-4xl">memory game</div>
          <div className="flex justify-between">
            {windowSize.width < 768 ? <ModalButton /> : <RegularButton />}
          </div>
        </div>
        <div className="h-[60vh] w-full sm:h-[70vh]  flex justify-center items-center flex-col gap-5 px-5 ">
          {data.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex gap-3 w-full text-center justify-center items-center"
            >
              {row.map((col, colIdx) => (
                <div
                  key={colIdx}
                  className="flex justify-center items-center w-24 h-24 sm:w-32 sm:h-32"
                  onClick={() => handleClick(rowIdx, colIdx)}
                >
                  {show[rowIdx][colIdx] ? (
                    <div className="text-5xl text-Yellow">{col}</div>
                  ) : (
                    <div className="h-full w-full bg-Beige rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center gap-5 text-center px-5">
          <div className="w-1/2 md:w-80 bg-Sage p-3 md:p-6 rounded-xl flex flex-col md:flex-row md:justify-between gap-3">
            <div className="text-2xl text-Yellow">Time</div>
            <Timer timer={timer} />
          </div>
          <div className="w-1/2 md:w-80 bg-Sage p-3 md:p-6 rounded-xl flex flex-col md:flex-row md:justify-between gap-3">
            <div className="text-2xl text-Yellow">Moves </div>
            <div className="text-3xl text-Beige">0</div>
          </div>
        </div>
      </div>
    </>
  );
}
