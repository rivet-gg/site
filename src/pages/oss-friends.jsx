import axios from 'axios';
import { Button } from '@/components/Button';

export default function OssFriends({ items }) {
  return (
    <>
      <h1>Rivet's <span className='text-purple-300'>Open Source</span> Friends</h1>
      <p>Other companies whose code & culture mirrors that at Rivet.</p>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {items.map((friend, index) => (
          <div key={index} className='flex flex-col overflow-hidden rounded-2xl bg-zinc-800 p-6 shadow-md outline outline-white/20'>
            <a href={friend.href} className='mb-2 text-xl font-bold font-display'>
              {friend.name}
            </a>
            <p className='mt-0 text-sm text-white-800'>{friend.description}</p>
            <div className='flex-grow' />
            <div className='mt-2'>
              <Button target='_blank' variant='primary' href={friend.href}>
                Learn more
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await axios.get('https://formbricks.com/api/oss-friends');
  return { props: { items: res.data.data } };
}
