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
    <div className={clsx(className, 'pointer-events-auto bg-slate-950')} {...props}>
      {isRunning && (
        <motion.div
          className='relative h-full w-full'
          animate={{ scaleX: [0.75, 1.3, 1], scaleY: [0, 0.01, 1.0] }}
          transition={{ duration: 0.4 }}
        >
          {/* Game canvas */}
          <canvas className='h-full w-full' ref={canvasElement}></canvas>

          {/* White overlay for TV effect */}
          <motion.div
            className='pointer-events-none absolute inset-0 h-full w-full bg-white'
            animate={{ opacity: [1, 1, 0] }}
            transition={{ duration: 0.6 }}
          ></motion.div>
        </motion.div>
      )}

      {/* Start UI */}
      {!isRunning && (
        <motion.div
          className='absolute inset-0 flex scale-90 cursor-pointer items-center justify-center font-pixel text-2xl font-bold text-white opacity-50 transition hover:scale-100 hover:opacity-100'
          onClick={() => setIsRunning(true)}
        >
          CLICK TO START
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: x => Math.round(x) }}
          >
            █
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}
