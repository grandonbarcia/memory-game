'use client';

import React from 'react';
import Timer from './Timer';
import Multiplayer from './MultiPlayer';

export default function EndGameModal({
  showModal,
  timer,
  moves,
  createNewGame,
  restartGame,
  rules,
  multiplayerScore,
}: {
  showModal: boolean;
  timer: number;
  moves: number;
  restartGame: () => void;
  createNewGame: () => void;
  rules: any;
  multiplayerScore: any;
}) {
  const listOfScores = multiplayerScore.map((el: any) => el.score);
  const tie = listOfScores.every((score: number) => score === listOfScores[0]);
  const highestScore = listOfScores.reduce(
    (largest: number, current: number, idx: number) =>
      current > largest ? current : largest,
    listOfScores[0]
  );

  const winner =
    listOfScores.findIndex((el: number) => {
      return el === highestScore;
    }) + 1;

  function SinglePlayerEnd() {
    return (
      <>
        <div className="w-full  bg-Sage p-3 md:p-6 rounded-xl flex flex-col md:flex-row md:justify-between gap-3">
          <div className="text-2xl text-Yellow">Timer</div>
          <Timer timer={timer} />
        </div>
        <div className="w-full  bg-Sage p-3 md:p-6 rounded-xl flex flex-col md:flex-row md:justify-between gap-3">
          <div className="text-2xl text-Yellow">Moves </div>
          <div className="text-3xl text-Beige">{moves}</div>
        </div>
      </>
    );
  }
  function MultiPlayerEnd() {
    return (
      <>
        {multiplayerScore.map((player: { score: number }, index: number) => {
          const thisPlayerwins = winner == index + 1;
          return (
            <div
              key={index}
              className={`w-full ${
                thisPlayerwins || tie ? 'bg-Sage' : ''
              }  p-3 md:p-6 rounded-xl flex flex-col md:flex-row md:justify-between gap-3`}
            >
              <div className="text-2xl text-Yellow">Player {index + 1} </div>
              <div className="text-3xl text-Beige">{player.score}</div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative min-w-[40rem] my-6 mx-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="flex flex-col relative p-8 gap-6">
                  <h1 className="text-6xl text-center">
                    {rules.players === '1' ? (
                      'You Did it!'
                    ) : (
                      <span>
                        {tie ? `It's A Tie` : `Player ${winner} Wins!`}
                      </span>
                    )}
                  </h1>
                  <h1 className="text-2xl text-center">
                    Game over! Here's how you did!
                  </h1>
                  <div className="w-full flex flex-col justify-center gap-5 text-center ">
                    {rules.player === '1' ? (
                      <SinglePlayerEnd />
                    ) : (
                      <MultiPlayerEnd />
                    )}
                  </div>
                  <div className="flex justify-evenly">
                    <button
                      className="w-1/2 py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none 
          bg-Sage
         rounded-full border border-gray-200 hover:bg-gray-100 hover:text-Beige focus:z-10 focus:ring-4 focus:ring-gray-200 "
                      onClick={restartGame}
                    >
                      restart
                    </button>
                    <button
                      className="w-1/2 py-2.5 px-5 mb-2 text-3xl font-medium text-gray-900 focus:outline-none 
          
         rounded-full border border-gray-200 hover:bg-gray-100 hover:text-Beige focus:z-10 focus:ring-4 focus:ring-gray-200 "
                      onClick={createNewGame}
                    >
                      new game
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
