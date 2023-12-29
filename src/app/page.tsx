'use client';

import { useState, useEffect } from 'react';
import StartMenu from './components/StartMenu';
import Game from './components/Game';
import End from './components/End';
export default function Home() {
  const [status, setStatus] = useState('game');
  const [rules, setRules] = useState({});
  const [readyToPlay, setReady] = useState(false);

  function game(status: string) {
    switch (status) {
      case 'menu':
        return (
          <StartMenu
            setRules={setRules}
            readyToPlay={readyToPlay}
            setStatus={setStatus}
          />
        );
      case 'game':
        return <Game />;
      case 'end':
        return <End />;
    }
  }

  useEffect(() => {
    if (Object.keys(rules).length === 3) {
      setReady(true);
    }
  }, [rules]);
  return <>{game(status)}</>;
}
