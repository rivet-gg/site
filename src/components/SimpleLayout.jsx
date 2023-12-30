export function SimpleLayout({ title, intro, children }) {
  return (
    <div className='mt-8 sm:mt-16 max-w-5xl mx-auto'>
      <header className='max-w-2xl'>
        <h1 className='text-4xl font-bold tracking-tight text-charcole-800 dark:text-cream-100 sm:text-5xl'>
          {title}
        </h1>
        <p className='mt-6 text-base text-charcole-600 dark:text-cream-400'>{intro}</p>
      </header>
      <div className='mt-16 sm:mt-20'>{children}</div>
    </div>
  );
}
