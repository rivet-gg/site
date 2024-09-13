import { TableOfContents } from '@/components/TableOfContents';
import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function ScriptPage({ id, script, mod }) {
  return (
    <Link
      key={id}
      id={id}
      href={`/modules/${mod}/scripts/${id}`}
      className='block cursor-pointer scroll-mt-header-offset rounded-md p-4 no-underline transition-colors hover:bg-cream-100/10'>
      <h3 className='m-0'>
        {script.config.name}
        <code className='ml-2'>{id}</code>
      </h3>
      <p className='m-0 text-white/80'>{script.config.description}</p>
    </Link>
  );
}

export default async function ModuleScriptsPage({ params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta } = mod;

  const scripts = Array.from(Object.entries<any>(meta.scripts || {}));

  const publicScripts = scripts.filter(([id, script]) => script.config.public);
  const privateScripts = scripts.filter(([id, script]) => !script.config.public);

  const toc = [
    {
      id: 'public-scripts',
      title: 'Public Scripts',
      children: publicScripts.map(([id, script]) => ({
        id,
        title: script.config.name,
        children: []
      }))
    },
    {
      id: 'private-scripts',
      title: 'Private Scripts',
      children: privateScripts.map(([id, script]) => ({
        id,
        title: script.config.name,
        children: []
      }))
    }
  ];

  return (
    <div className='flex flex-row justify-between gap-4'>
      <div className='w-full max-w-3xl'>
        <h3 className='font-display text-3xl text-white' id='public-scripts'>
          Public Scripts
        </h3>
        <div className='prose mt-4'>
          {publicScripts.length > 0 ? (
            publicScripts.map(([id, script]) => (
              <ScriptPage key={id} id={id} mod={params.module} script={script} />
            ))
          ) : (
            <p>No public scripts defined for this module.</p>
          )}
        </div>
        <hr className='my-4 border-cream-100/10' />
        <h3 className='font-display text-3xl text-white' id='private-scripts'>
          Private Scripts
        </h3>
        <div className='prose mt-4'>
          {privateScripts.length > 0 ? (
            privateScripts.map(([id, script]) => (
              <ScriptPage key={id} id={id} mod={params.module} script={script} />
            ))
          ) : (
            <p>No private scripts defined for this module.</p>
          )}
        </div>
      </div>

      <div className='w-full max-w-sm'>
        <TableOfContents tableOfContents={toc} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return generateModulesPageParams();
}
