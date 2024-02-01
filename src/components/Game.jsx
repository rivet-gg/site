import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { initClient, startClientDrawloop, createInputEventListener, createResizeEventListener } from '../../game/client/state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

// Global client  used to prevent duplicate creation if component is re-mounted
let globalClient = null;

export function Game({ className, ...props }) {
  let [isRunning, setIsRunning] = useState(false);
  let [gameClient, setGameClient] = useState(null);

  const canvasElement = useRef(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_RIVET_TOKEN) {
      console.warn("NEXT_PUBLIC_RIVET_TOKEN not provided");
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
    <div className={clsx(className, 'flex justify-center', 'pointer-events-auto bg-charcole-950')} {...props}>
      <canvas ref={canvasElement}></canvas>
    </div>
  );
}
