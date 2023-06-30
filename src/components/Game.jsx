import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { createClient } from '../../game/client/Client';

export function Game({ className, ...props }) {
  let [isRunning, setIsRunning] = useState(false);
  let [gameClient, setGameClient] = useState(null);

  const canvasElement = useRef(null);

  useEffect(() => {
    if (canvasElement.current && gameClient == null) {
      console.log('Creating game client');
      let client = createClient(canvasElement.current);
      setGameClient(client);
    }
  }, [isRunning, gameClient]);

  return (
    <div className={clsx(className, 'bg-slate-950')} {...props}>
      {isRunning && <canvas className='h-full w-full' ref={canvasElement}></canvas>}

      {/* Start UI */}
      {!isRunning && (
        <div
          className='absolute inset-0 flex scale-90 cursor-pointer items-center justify-center font-pixel text-2xl font-bold text-white opacity-50 transition hover:scale-100 hover:opacity-100'
          onClick={() => setIsRunning(true)}>
          CLICK TO START
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: x => Math.round(x) }}>
            █
          </motion.span>
        </div>
      )}
    </div>
  );
}
