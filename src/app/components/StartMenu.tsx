'use client';

import { useEffect, useState } from 'react';

export default function StartMenu({
  setRules,
  readyToPlay,
  setStatus,
}: {
  setRules: any;
  setStatus: any;
  readyToPlay: boolean;
}) {
  const [listOfOptions, setListOfOption] = useState({
    theme: [
      { name: 'numbers', isSelected: false },
      { name: 'icons', isSelected: false },
    ],
    players: [
      { name: '1', isSelected: false },
      { name: '2', isSelected: false },
      { name: '3', isSelected: false },
      { name: '4', isSelected: false },
    ],
    grid: [
      { name: '4x4', isSelected: false },
      { name: '6x6', isSelected: false },
    ],
  });

  function Title({ children }: { children: string }) {
    return <h3 className="text-2xl">{children}</h3>;
  }

  function Button({
    children,
    width,
    category,
    isSelected,
    idx,
  }: {
    children: string;
    width: string;
    category: string;
    isSelected: boolean;
    idx: number;
  }) {
    return (
      <button
        type="button"
        onClick={() => handleClick(children, category, isSelected, idx)}
        className={`${width} py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none ${
          isSelected ? 'bg-Sage' : 'bg-white'
        } rounded-full border border-gray-200 hover:bg-gray-100 hover:text-Beige focus:z-10 focus:ring-4 focus:ring-gray-200 `}
      >
        {children}
      </button>
    );
  }

  function handleClick(
    name: string,
    category: string,
    isSelected: boolean,
    idx: number
  ) {
    setListOfOption((prevOptions: any) => {
      let categoryOptionsArr = [...prevOptions[category]];

      let newArr = categoryOptionsArr.map((option, optionIdx) =>
        idx === optionIdx
          ? { ...option, isSelected: !option.isSelected }
          : { ...option, isSelected: false }
      );

      return {
        ...prevOptions,
        [category]: [...newArr],
      };
    });
    setRules((prevRules: object) => {
      return { ...prevRules, [category]: name };
    });
  }

  function startGame() {
    setStatus('game');
  }

  function StartButton({
    children,
    readyToPlay,
  }: {
    children: string;
    readyToPlay: boolean;
  }) {
    return (
      <button
        type="button"
        disabled={!readyToPlay}
        onClick={startGame}
        className={`w-full py-2.5 px-5 me-2 mb-2 text-3xl font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-Beige focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
      >
        {children}
      </button>
    );
  }

  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center bg-Green gap-5">
      <h1 className="text-5xl">Memory</h1>
      <div className=" h-[30.25rem] w-[40.25rem] flex flex-col gap-5 bg-white rounded-2xl p-10">
        <div className="3">
          <Title>select theme</Title>
          <div className="flex justify-evenly">
            {listOfOptions.theme.map((option, idx) => (
              <Button
                key={idx}
                width="w-1/2"
                category={'theme'}
                isSelected={option.isSelected}
                idx={idx}
              >
                {option.name}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Title>number of players</Title>
          <div className="flex justify-evenly">
            {listOfOptions.players.map((option, idx) => (
              <Button
                key={idx}
                width="w-1/5"
                category={'players'}
                idx={idx}
                isSelected={option.isSelected}
              >
                {option.name}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Title>Grid Size</Title>
          <div className="flex justify-evenly">
            {listOfOptions.grid.map((option, idx) => (
              <Button
                key={idx}
                width="w-2/3"
                category={'grid'}
                idx={idx}
                isSelected={option.isSelected}
              >
                {option.name}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <StartButton readyToPlay={readyToPlay}>StartGame</StartButton>
        </div>
      </div>
    </section>
  );
}
