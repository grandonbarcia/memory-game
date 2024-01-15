'use client';

import { useState, useEffect, use } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import ModalButton from './Modal';
import Timer from './Timer';
import useIcons from '../hooks/useIcons';
import SinglePlayer from './SinglePlayer';
import Multiplayer from './MultiPlayer';
import EndGameModal from './EndGameModal';

export default function Game({
  rules,
  status,
  setStatus,
  moves,
  countMoves,
  multiplayerScore,
  setMultiPlayerScore,
}: {
  moves: any;
  countMoves: any;
  multiplayerScore: any;
  setMultiPlayerScore: any;
  rules: any;
  status: string;
  setStatus: any;
}) {
  const [data, setData] = useState(createNewBoard());
  const [show, setShow] = useState(coverBoard());
  const [clicked, setClicked] = useState(0);
  const [first, setFirst] = useState<number[]>([]);
  const [second, setSecond] = useState<number[]>([]);

  const [timer, setTimer] = useState(0);

  const [gameStart, startGame] = useState(false);

  const [count, setCount] = useState(0);

  const [showModal, setShowModal] = useState(true);

  const score = {
    player1: { score: 0, turn: true },
    player2: { score: 0, turn: false },
  };

  const windowSize = useWindowSize();
  const icons = useIcons();

  useEffect(() => {
    let interval: number;
    if (gameStart) {
      interval = window.setInterval(() => {
        setTimer((prevTime: number) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameStart]);

  useEffect(() => {
    console.log(count);
    console.log(rules);
    if (rules.grid === '4x4' && count === 8) {
      setStatus('end');
    }
  }, [count]);

  function generatePlayers() {
    if (rules.player === '1') return;
    let players: any = [];
    const forPlayerOne = { score: 0, turn: true };
    const forRestOfPlayers = { score: 0, turn: false };
    for (let i = 1; i <= rules.players; i++) {
      if (i === 1) {
        players.push(forPlayerOne);
      } else {
        players.push(forRestOfPlayers);
      }
    }

    return JSON.parse(JSON.stringify(players));
  }

  function coverBoard() {
    const num = parseInt(rules.grid.split('').shift());
    return Array(num)
      .fill(0)
      .map(() => new Array(num).fill(false));
  }

  function randomizeArr(array: number[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function create2dArr(array: number[], size: number) {
    const my2DArr: number[][] = [];
    for (let i = 0; i < size; i++) {
      my2DArr[i] = [];
      for (let j = 0; j < size; j++) {
        let temp: any = array.shift();
        my2DArr[i][j] = temp;
      }
    }

    return my2DArr;
  }

  function populateArr(size: number) {
    const count = (size * size) / 2;
    let arr = [];
    for (let i = 1; i <= count; i++) {
      arr.push(i);
      arr.push(i);
    }

    return arr;
  }

  function createNewBoard() {
    const num = parseInt(rules.grid.split('').shift()!);
    const filledArr = populateArr(num);
    const newArr = randomizeArr([...filledArr]);
    const newArr2d = create2dArr([...newArr], num);
    return newArr2d;
  }

  function nextTurn() {
    setClicked(0);
    setFirst([]);
    setSecond([]);
  }

  function restartGame() {
    setShow(coverBoard());
    setClicked(0);
    setFirst([]);
    setSecond([]);
    setTimer(0);
    countMoves(0);
  }

  function createNewGame() {
    setShow(coverBoard());
    setStatus('menu');
  }

  function handleClick(colIdx: number, rowIdx: number) {
    startGame(true);
    if (clicked < 2) {
      let cloneArr = [...show!];
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
          onClick={restartGame}
        >
          restart
        </button>
        <button
          className="py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none 
          
         rounded-full border border-gray-200 hover:bg-gray-100 hover:text-Beige focus:z-10 focus:ring-4 focus:ring-gray-200 "
          onClick={createNewGame}
        >
          new game
        </button>
      </div>
    );
  }

  useEffect(() => {
    if (clicked === 2) {
      const timer = setTimeout(() => {
        const firstClick = data![first[0]][first[1]];
        const secondClick = data![second[0]][second[1]];

        if (firstClick !== secondClick) {
          let cloneArr = [...show!];
          cloneArr[first[0]][first[1]] = false;
          cloneArr[second[0]][second[1]] = false;
          setShow([...cloneArr]);
          nextTurn();
        } else {
          nextTurn();
          setCount(count + 1);
          if (rules.players !== '1') {
            setMultiPlayerScore((prevState: []) => {
              const newState = prevState.map(
                (el: { score: number; turn: boolean }) =>
                  el.turn ? { ...el, score: el.score + 1 } : { ...el }
              );

              return newState;
            });
          }
        }
        if (rules.players === '1') {
          countMoves((prevMoves: any) => prevMoves + 1);
        } else {
          setMultiPlayerScore((prevState: []) => {
            let currentTurn = prevState.findIndex(
              (el: { score: number; turn: boolean }) => el.turn
            );

            currentTurn++;
            if (currentTurn === prevState.length) {
              currentTurn = 0;
            }
            const newState = prevState.map(
              (el: { score: number; turn: boolean }, idx: number) =>
                idx === currentTurn
                  ? { ...el, turn: true }
                  : { ...el, turn: false }
            );
            return newState;
          });
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
          {data!.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex gap-3 w-full text-center justify-center items-center"
            >
              {row.map((col, colIdx) => (
                <div
                  key={colIdx}
                  className={`flex justify-center items-center w-24 h-24 ${
                    rules.grid === '6x6' ? 'sm:w-20 sm:h-20' : 'sm:w-32 sm:h-32'
                  }`}
                >
                  {show![rowIdx][colIdx] ? (
                    <div className="text-7xl text-Yellow">
                      {rules.theme === 'numbers' ? col : icons[col]}
                    </div>
                  ) : (
                    <div
                      className="h-full w-full bg-Beige rounded-full"
                      onClick={() => handleClick(rowIdx, colIdx)}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        {rules.players === '1' ? (
          <SinglePlayer timer={timer} moves={moves} />
        ) : (
          <Multiplayer multiplayerScore={multiplayerScore} />
        )}
      </div>
      {<EndGameModal showModal={showModal} />}
    </>
  );
}
