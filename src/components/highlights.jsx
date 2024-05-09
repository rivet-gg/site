import React from 'react';
import clsx from 'clsx';

export function IncludedHighlights({title, image}) {
  return (
    <div className={clsx(
      'relative transition text-sm font-semibold text-cream-100 border-2 bg-charcole-950 border-cream-100/20',
      'flex flex-col justify-center items-center px-5 py-8',
      'text-center'
    )}>
      {image ? (
        <Image className='h-full w-full object-contain' src={image} alt={title} />
      ) : (
        <div className="text-lg font-semibold leading-tight mt-2">{title}</div>
      )}
    </div>
  );
}

export default function SectionHighlight() {
  return (
    <div className='max-w-6xl mx-auto px-6 lg:px-8 flex flex-col'>
      <h2 className='text-4xl font-display font-bold tracking-tight text-cream-100 sm:text-5xl'>{'Cutting edge tools for game development'}</h2>
      <div className={clsx(
        "w-full grid gap-2 mt-8",
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-2",
      )}>
        <IncludedHighlights title="Container runtime written specifically for games" />
        {/* <IncludedHighlights image={globe} /> */}
        <IncludedHighlights title="Edge routing & CDN architecture optimized for game traffic" />
        <IncludedHighlights title="Rugged, multi-region architecture built to withstand datacenter failures" />
        <IncludedHighlights title="JIT hardware provisioning to absorb DDoS attacks and player spikes" />
        <IncludedHighlights title="Load tested" />
        <IncludedHighlights title="Well documented architecture & SBOM" />
      </div>
    </div>
  );
}
