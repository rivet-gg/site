import { Prose } from '@/components/Prose';
import { TableOfContents } from '@/components/TableOfContents';

export const metadata = {
  title: {
    template: '%s - Rivet Blog'
  }
};

export default function BlogLayout({ children }) {
  return (
    <>
      <article>
        <Prose className='max-w-4xl pb-8'>{children}</Prose>
      </article>
      <TableOfContents />
    </>
  );
}
