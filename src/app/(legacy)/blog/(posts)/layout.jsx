export const metadata = {
  title: {
    template: '%s - Rivet Blog'
  }
};

export default function BlogLayout({ children }) {
  return (
    <div className='flex flex-1 flex-col gap-x-4 md:grid md:grid-cols-table-of-contents  xl:flex xl:flex-row xl:gap-8'>
      {children}
    </div>
  );
}
