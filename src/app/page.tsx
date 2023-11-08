'use client';

import { useState } from 'react';

const nums = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

export default function Home() {
  const [data, setData] = useState([...nums]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="flex w-3/6 justify-between">
          <div>memory game</div>
          <div className="flex w-1/6 justify-between">
            <div>Restart</div>
            <div>New Game</div>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {data.map((row, rowIdx) => (
            <div className="flex gap-10">
              {row.map((col, colIdx) => (
                <div>{col}</div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
