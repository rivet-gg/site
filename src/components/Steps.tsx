export function Steps({ children }) {
  return children;
}

export function Step({ children, title }) {
  return (
    <div>
      <p className='mb-4 font-display text-2xl text-white'>{title}</p>
      {children}
    </div>
  );
}
