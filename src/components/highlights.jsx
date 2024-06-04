import React from 'react';
import clsx from 'clsx';

export function FeatureHighlight({ title, description }) {
  return (
    <div className={clsx(
      'relative transition text-sm font-semibold text-cream-100 border-2 border-cream-100/20 bg-charcole-950',
      'flex flex-col justify-center items-center px-5 py-8',
      'text-center rounded-lg'
    )}>
      <div className="text-lg font-semibold leading-tight mb-2">{title}</div>
      <div>{description}</div>
    </div>
  );
}

export default function SectionHighlight() {
  return (
    <div className='max-w-6xl mx-auto px-6 lg:px-8 flex flex-col'>
      <h2 className='text-4xl font-display font-bold tracking-tight text-cream-100 sm:text-5xl'>{'The Only Backend Your Game Needs'}</h2>
      <div className={clsx(
        "w-full grid gap-4 mt-8",
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
      )}>
        <FeatureHighlight 
          title="Launch quickly, scale painlessly" 
          description="Building backends should not take time away from launching your game."
        />
        <FeatureHighlight 
          title="Customizable" 
          description="There is no one size fits all for backends. Modify & create modules effortlessly."
        />
        <FeatureHighlight 
          title="All-in-one" 
          description="Single developer platform for your whole team to build single & multiplayer games."
        />
        <FeatureHighlight 
          title="No vendor locking" 
          description="You shouldn’t have to build your backend around someone else’s closed-source framework."
        />
      </div>
    </div>
  );
}