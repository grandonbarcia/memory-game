'use client';

import React from 'react';
import Timer from './Timer';

export default function EndGameModal({
  showModal,
  timer,
  moves,
  createNewGame,
  restartGame,
}: {
  showModal: boolean;
  timer: number;
  moves: number;
  restartGame: () => void;
  createNewGame: () => void;
}) {
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
                  <h1 className="text-6xl text-center">You Did it!</h1>
                  <h1 className="text-2xl text-center">
                    Game over! Here's how you did!
                  </h1>
                  <div className="w-full flex flex-col justify-center gap-5 text-center ">
                    <div className="w-full  bg-Sage p-3 md:p-6 rounded-xl flex flex-col md:flex-row md:justify-between gap-3">
                      <div className="text-2xl text-Yellow">Timer</div>
                      <Timer timer={timer} />
                    </div>
                    <div className="w-full  bg-Sage p-3 md:p-6 rounded-xl flex flex-col md:flex-row md:justify-between gap-3">
                      <div className="text-2xl text-Yellow">Moves </div>
                      <div className="text-3xl text-Beige">{moves}</div>
                    </div>
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
