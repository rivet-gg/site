'use client';
import { faArrowRight, faX } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

export const CreditsBanner = () => {
  const [visible, setVisible] = useState(false);
  const handleClose = e => {
    e.preventDefault();
    localStorage.setItem('creditsBannerClosed', 'true');
    setVisible(false);
    document.body.style.setProperty('--banner-height', '0');
  };

  useEffect(() => {
    let isVisible = localStorage.getItem('creditsBannerClosed') === null;
    setVisible(isVisible);
    document.body.style.setProperty('--banner-height', isVisible ? '2.5rem' : '0rem');
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <a
      href='https://b8v8449klvp.typeform.com/to/ZtMjRE7f'
      target='_blank'
      rel='noreferrer'
      className='lg:text-md pointer-events-auto fixed inset-x-0 top-[var(--header-height)] z-10 flex items-center justify-center gap-2 bg-gray-200 px-2 py-2 text-center text-sm font-extrabold'>
      <span>
        Apply for up to $120,000.00 in cloud credits to run your game on Rivet with Akamai RISE
        <FontAwesomeIcon icon={faArrowRight} className='ms-1 h-6 w-6' />
      </span>
      <FontAwesomeIcon
        icon={faX}
        onClick={handleClose}
        className='right-6 h-4 w-4 lg:absolute lg:top-1/2 lg:-translate-y-1/2'
      />
    </a>
  );
};
