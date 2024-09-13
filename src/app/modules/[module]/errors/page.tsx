import { TableOfContents } from '@/components/TableOfContents';
import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import { notFound } from 'next/navigation';

export default async function ModuleErrorsPage({ params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta } = mod;

  const errors = Array.from(Object.entries<any>(meta.config.errors || {}));
  const errorHeaders = errors.map(([id, error]) => ({
    id,
    title: error.name,
    children: []
  }));

  return (
    <div className='flex flex-row justify-between gap-4'>
      <div className='w-full max-w-3xl'>
        <h2 className='mb-4 font-display text-3xl text-white'>Errors</h2>
        <div className='prose'>
          {errors.length > 0 ? (
            errors.map(([id, error]) => (
              <div key={id} id={id} className='scroll-mt-header-offset py-4 '>
                <h3 className='m-0'>
                  {error.name}
                  <code className='ml-2'>{id}</code>
                </h3>
                <p className='m-0'>{error.description}</p>
              </div>
            ))
          ) : (
            <p>No errors defined for this module.</p>
          )}
        </div>
      </div>
      <div className='w-full max-w-sm'>
        <TableOfContents tableOfContents={errorHeaders} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return generateModulesPageParams();
}
