'use client';

import { useState, useEffect, use } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import ModalButton from './MobileModal';
import Timer from './Timer';
import useIcons from '../hooks/useIcons';
import SinglePlayer from './SinglePlayer';
import Multiplayer from './MultiPlayer';
import EndGameModal from './EndGameModal';
import RestartButton from './RestartButton';
import NewGameButton from './NewGameButton';
import GameTitle from './GameTitle';

export default function Game({
  rules,
  status,
  setStatus,
  moves,
  countMoves,
  multiplayerScore,
  setMultiPlayerScore,
  generatePlayers,
}: {
  moves: any;
  countMoves: any;
  multiplayerScore: any;
  setMultiPlayerScore: any;
  rules: any;
  status: string;
  setStatus: any;
  generatePlayers: () => void;
}) {
  const [value, setValue] = useState(createNewBoard());
  const [coveredValues, setCoveredValues] = useState(coverBoard());
  const [clicked, setClicked] = useState(0);
  const [firstClickLocation, setFirstClickLocation] = useState<number[]>([]);
  const [secondClickLocation, setSecondClickLocation] = useState<number[]>([]);

  const [timer, setTimer] = useState(0);
  const [gameStart, startGame] = useState(false);

  const [count, setCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const score = {
    player1: { score: 0, turn: true },
    player2: { score: 0, turn: false },
  };

  const windowSize = useWindowSize();
  const icons = useIcons();

  useEffect(() => {
    let gameTimer: number;
    if (gameStart) {
      gameTimer = startTimer();
    }

    return () => clearInterval(gameTimer);
  }, [gameStart]);

  useEffect(() => {
    if (rules.grid === '4x4' && count === 8) {
      startGame(false);
      setShowModal(true);
    }

    if (rules.grid === '6x6' && count === 18) {
      startGame(false);
      setShowModal(true);
    }
  }, [count]);

  function startTimer() {
    return window.setInterval(() => {
      setTimer((prevTime: number) => prevTime + 1);
    }, 1000);
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
    setFirstClickLocation([]);
    setSecondClickLocation([]);
  }

  function restartGame() {
    setCoveredValues(coverBoard());
    setClicked(0);
    setFirstClickLocation([]);
    setSecondClickLocation([]);
    setTimer(0);
    countMoves(0);
    setShowModal(false);
    startGame(false);
    setMultiPlayerScore(generatePlayers());
  }

  function createNewGame() {
    setCoveredValues(coverBoard());
    setStatus('menu');
    setShowModal(false);
    countMoves(0);
  }

  function UncoverClickedValue(colIdx: number, rowIdx: number) {
    startGame(true);
    if (clicked < 2) {
      const cloneCoveredValues = JSON.parse(JSON.stringify(coveredValues));
      cloneCoveredValues[colIdx][rowIdx] = true;
      setCoveredValues([...cloneCoveredValues]);
      setClicked(clicked + 1);
      if (firstClickLocation.length === 0) {
        setFirstClickLocation([colIdx, rowIdx]);
      } else {
        setSecondClickLocation([colIdx, rowIdx]);
      }
    }
  }

  function RegularButtonRow() {
    return (
      <div>
        <RestartButton restartGame={restartGame} />
        <NewGameButton createNewGame={createNewGame} />
      </div>
    );
  }

  useEffect(() => {
    if (clicked === 2) {
      const timer = setTimeout(() => {
        const firstClick = value![firstClickLocation[0]][firstClickLocation[1]];
        const secondClick =
          value![secondClickLocation[0]][secondClickLocation[1]];

        if (firstClick !== secondClick) {
          let cloneArr = JSON.parse(JSON.stringify(coveredValues));
          cloneArr[firstClickLocation[0]][firstClickLocation[1]] = false;
          cloneArr[secondClickLocation[0]][secondClickLocation[1]] = false;
          setCoveredValues([...cloneArr]);
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
          <GameTitle />
          <div className="flex justify-between">
            {windowSize.width < 768 ? <ModalButton /> : <RegularButtonRow />}
          </div>
        </div>
        <div className="h-[60vh] w-full sm:h-[70vh]  flex justify-center items-center flex-col gap-5 px-5 ">
          {value!.map((row, rowIdx) => (
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
                  {coveredValues![rowIdx][colIdx] ? (
                    <div className="text-7xl text-Yellow">
                      {rules.theme === 'numbers' ? col : icons[col]}
                    </div>
                  ) : (
                    <div
                      className="h-full w-full bg-Beige rounded-full"
                      onClick={() => UncoverClickedValue(rowIdx, colIdx)}
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
      {
        <EndGameModal
          showModal={showModal}
          timer={timer}
          moves={moves}
          restartGame={restartGame}
          createNewGame={createNewGame}
          rules={rules}
          multiplayerScore={multiplayerScore}
        />
      }
    </>
  );
}
