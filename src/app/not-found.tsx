import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlockQuestion } from '@fortawesome/sharp-solid-svg-icons';
import { GameBackground } from '@/components/Game';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import '@/styles/tailwind.css';
import '@/styles/fonts.css';

function PageNotFound() {
  return (
    <div>
      <Header />
      <div className='relative pt-14'>
        <div className='relative flex min-h-[80vh] w-full items-center justify-center text-center'>
          <GameBackground />
          <div className='transition-opacity'>
            <h1 className='mb-3 flex items-center justify-center text-3xl text-white'>
              <FontAwesomeIcon className='mr-2 size-10' icon={faBlockQuestion} /> Not Found
            </h1>
            <Button href='/' variant='secondary'>
              Home
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PageNotFound;
