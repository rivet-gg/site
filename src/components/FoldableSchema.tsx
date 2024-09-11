'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function Foldable({
  title = 'Show child properties',
  closeTitle = 'Hide child properties',
  children
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className='rounded-md bg-charcole-900/30 px-2 text-xs text-white transition-colors hover:bg-charcole-900/50'
        onClick={() => setIsOpen(open => !open)}
      >
        {isOpen ? closeTitle : title}
      </button>
      <motion.div
        className='overflow-hidden'
        initial={false}
        variants={{
          open: { height: 'auto', opacity: 1 },
          closed: { height: 0, opacity: 0 }
        }}
        animate={isOpen ? 'open' : 'closed'}
        transition={{
          opacity: isOpen ? { delay: 0.3 } : {},
          height: !isOpen ? { delay: 0.3 } : {},
          duration: 0.3
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
