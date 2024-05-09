'use client';
import { faArrowRight, faX } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export const CreditsBanner = () => {
  const [visible, setVisible] = useState(false);
  const handleClose = e => {
    e.preventDefault();
    localStorage.setItem('creditsBannerClosed', 'true');
    window.dispatchEvent(new Event('creditsBannerChange'));
    setVisible(false);
  };

  useEffect(() => {
    localStorage.getItem('creditsBannerClosed') === 'true' ? setVisible(false) : setVisible(true);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <a
      href='https://b8v8449klvp.typeform.com/to/ZtMjRE7f'
      target='_blank'
      rel='noreferrer'
      className={clsx(
        'fixed inset-x-0 top-[calc(var(--header-height)-2.5rem)]',
        'lg:text-md pointer-events-auto z-10 flex items-center justify-center gap-2 bg-charcole-900 px-2 text-center text-sm font-bold text-cream-100',
        'h-10'
      )}>
      <span className='flex items-center'>
        Announcing up to $120k credits with Akamai RISE
        <FontAwesomeIcon icon={faArrowRight} className='ms-1 h-4 w-4' />
      </span>
      <FontAwesomeIcon
        icon={faX}
        onClick={handleClose}
        className='right-6 h-4 w-4 lg:absolute lg:top-1/2 lg:-translate-y-1/2'
      />
    </a>
  );
};
