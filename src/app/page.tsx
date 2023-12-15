'use client';

import { useState, useEffect } from 'react';
import Game from './components/Game';
import StartMenu from './components/StartMenu';
export default function Home() {
  return (
    <>
      <main className="">
        <StartMenu />
      </main>
    </>
  );
}
