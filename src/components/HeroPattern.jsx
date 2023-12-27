import { GridPattern } from '@/components/GridPattern';
import bg from '@/images/effects/bg.svg';
import Image from 'next/image';

export function HeroPattern() {
  return (
    <Image src={bg} className='absolute right-0 top-0 -z-10 w-[1100px] h-auto max-w-none opacity-20'></Image>
  );
}
