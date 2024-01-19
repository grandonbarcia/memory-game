'use client';

import { useState, useEffect } from 'react';
import StartMenu from './components/StartMenu';
import Game from './components/Game';
export default function Home() {
  const [status, setStatus] = useState('menu');
  const [rules, setRules] = useState({
    theme: 'numbers',
    players: '1',
    grid: '4x4',
  });
  const [readyToPlay, setReady] = useState(false);
  const [multiplayerScore, setMultiPlayerScore] = useState(generatePlayers());
  const [moves, countMoves] = useState(0);

  function generatePlayers() {
    if (rules.players === '1') return;
    let players: any = [];
    const forPlayerOne = { score: 0, turn: true };
    const forRestOfPlayers = { score: 0, turn: false };
    for (let i = 1; i <= parseInt(rules.players); i++) {
      if (i === 1) {
        players.push(forPlayerOne);
      } else {
        players.push(forRestOfPlayers);
      }
    }

    return JSON.parse(JSON.stringify(players));
  }

  useEffect(() => {
    setMultiPlayerScore(generatePlayers());
  }, [rules, generatePlayers]);

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
        return (
          <Game
            rules={rules}
            status={status}
            setStatus={setStatus}
            moves={moves}
            countMoves={countMoves}
            multiplayerScore={multiplayerScore}
            setMultiPlayerScore={setMultiPlayerScore}
            generatePlayers={generatePlayers}
          />
        );
    }
  }

  useEffect(() => {
    if (Object.keys(rules).length === 3) {
      setReady(true);
    }
  }, [rules]);
  return <>{game(status)}</>;
}
