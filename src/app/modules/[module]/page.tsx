import { notFound } from 'next/navigation';
import { Code, CodeGroup } from '@/components/Code';
import { Prose } from '@/components/Prose';
import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGitAlt } from '@fortawesome/free-brands-svg-icons';

export default async function ModulePage({ params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta, Readme } = mod;

  return (
    <div className='flex flex-row justify-between gap-4'>
      <div className='max-w-3xl'>
        <Prose>
          <Readme />
        </Prose>
      </div>
      <div className='w-full max-w-sm text-white'>
        <h3 className='-mb-3'>Install the module</h3>
        <CodeGroup>
          <Code>{`rivet module add ${params.module}`}</Code>
        </CodeGroup>

        <h3 className=' mb-3 text-base'>Authors</h3>
        <section className='prose mb-3'>
          <ul>
            {meta.config.authors.map(author => (
              <li key={author}>
                <a href={`https://github.com/${author}`}>{author}</a>
              </li>
            ))}
          </ul>
        </section>

        <section className='prose mb-3'>
          <a
            href={`https://github.com/rivet-gg/modules/tree/main/modules/${params.module}`}
            target='_blank'
            className='flex items-center gap-1'
            rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faGitAlt} className='inline-block max-h-4' /> View Source Code
          </a>
        </section>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return generateModulesPageParams();
}
