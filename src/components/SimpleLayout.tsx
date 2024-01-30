interface SimpleLayoutProps {
  title: string;
  intro?: string;
  floatRight?: React.ReactNode;
  children?: React.ReactNode;
}

export function SimpleLayout({ title, intro = '', floatRight = null, children }: SimpleLayoutProps) {
  return (
    <div className='mx-auto mt-8 max-w-5xl sm:mt-16'>
      <header>
        {floatRight && <div className='float-right'>{floatRight}</div>}
        <h1 className='text-4xl font-bold tracking-tight text-cream-100 sm:text-5xl'>{title}</h1>
        <p className='text-basetext-cream-400 mt-6'>{intro}</p>
      </header>
      <div className='mt-16 sm:mt-20'>{children}</div>
    </div>
  );
}
