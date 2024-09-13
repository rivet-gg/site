import { Navigation } from '@/components/Navigation';
import { Prose } from '@/components/Prose';
import { TableOfContents } from '@/components/TableOfContents';
import { ReactNode } from 'react';

interface DocsLayoutProps {
  children: ReactNode;
}

export const DocsLayout = ({ children }: DocsLayoutProps) => {
  return (
    <>
      <Prose
        as='article'
        className='max-w-3xl'
        style={{ '--header-height': 'var(--spacing-top-navigation)' }}>
        {children}
      </Prose>
    </>
  );
};
