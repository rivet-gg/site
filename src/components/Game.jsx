'use client';
import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { initClient } from '../../game/client/state';

// Global client  used to prevent duplicate creation if component is re-mounted
let globalClient = null;

export function Game({ className, ...props }) {
  let [isRunning, setIsRunning] = useState(false);
  let [gameClient, setGameClient] = useState(null);

  const canvasElement = useRef(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_RIVET_TOKEN) {
      console.warn('NEXT_PUBLIC_RIVET_TOKEN not provided');
      return;
    }

    if (canvasElement.current && gameClient == null) {
      // Prevent duplicate creation of client
      if (!globalClient || globalClient.shutdown) {
        globalClient = initClient(canvasElement.current);
      }

      setGameClient(globalClient);
      setIsRunning(true);
    }
  }, [isRunning, gameClient]);

  return (
    <div className={clsx(className, 'flex items-center justify-center', 'pointer-events-auto')} {...props}>
      <canvas ref={canvasElement}></canvas>
    </div>
  );
}

export function GameBackground() {
  return (
    <div className={clsx('absolute inset-0 -z-50')}>
      <Game className='absolute inset-0' />

      {/* Multiplayer note */}
      <div className='pointer-events-none absolute bottom-2 right-2 z-20 flex select-none items-center justify-center px-2.5 py-1 text-xs font-bold uppercase text-cream-100/50 opacity-60'>
        <span>This game is multiplayer</span>
      </div>
    </div>
  );
}
