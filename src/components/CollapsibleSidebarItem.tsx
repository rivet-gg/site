'use client';

import { SidebarSection } from '@/lib/sitemap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface CollapsibleSidebarItemProps {
  item: SidebarSection;
  children?: ReactNode;
}

export function CollapsibleSidebarItem({ item, children }: CollapsibleSidebarItemProps) {
  const [isOpen, setIsOpen] = useState(item.initiallyOpen ?? false);
  return (
    <div>
      <button
        className='mt-2 flex w-full appearance-none items-center gap-4 px-2 py-1 text-sm font-semibold'
        onClick={() => setIsOpen(open => !open)}>
        {item.title}
        <motion.span
          initial={{ rotateZ: '-90deg' }}
          animate={{ rotateZ: isOpen ? 0 : '-90deg' }}
          className='-ml-1.5 mr-2 inline-block w-3.5'>
          <FontAwesomeIcon icon={faChevronDown} className='size-auto' />
        </motion.span>
      </button>
      <motion.div
        className='overflow-hidden pl-1'
        initial={item.initiallyOpen ? 'open' : 'closed'}
        variants={{
          open: { height: 'auto', opacity: 1 },
          closed: { height: 0, opacity: 0 }
        }}
        animate={isOpen ? 'open' : 'closed'}
        transition={{
          opacity: isOpen ? { delay: 0.3 } : {},
          height: !isOpen ? { delay: 0.3 } : {},
          duration: 0.3
        }}>
        {children}
      </motion.div>
    </div>
  );
}
