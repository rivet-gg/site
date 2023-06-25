import Image from 'next/image';

import textBlack from '@/images/branding/black.svg';
import textWhite from '@/images/branding/white.svg';

export function Logo({ ...props }) {
  return (
    <div {...props}>
      <Image src={textBlack} alt='Rivet' className='h-full w-auto dark:hidden' />
      <Image src={textWhite} alt='Rivet' className='light:hidden h-full w-auto' />
    </div>
  );
}
