import { useRef } from 'react';
import clsx from 'clsx';

export default function Earth(props) {
  const videoRef = useRef(null);
  // <Earth className='h-full w-auto object-cover brightness-[0.4] contrast-[1.4] opacity-50 grayscale filter' />
  // A: https://www.pexels.com/video/planet-earth-spinning-8295518/
  // B: https://www.pexels.com/video/planet-earth-spinning-10343918/
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      ref={videoRef}
      {...props}
      className={clsx(props.className,
      // 'opacity-50 brightness-[0.4] contrast-[1.4] grayscale filter'
      'opacity-10 grayscale filter'
      )}>
      <source src='https://assets.rivet.gg/effects/earth-drafts/earth.webm' type='video/mp4' />
    </video>
  );
}
