'use client';

import { useState, useEffect } from 'react';
import Game from './components/Game';
import StartMenu from './components/StartMenu';
export default function Home() {
  const [rules, setRules] = useState({});

  useEffect(() => {
    console.log(rules);
  }, [rules]);
  return (
    <>
      <main className="">
        <StartMenu setRules={setRules} />
      </main>
    </>
  );
}
