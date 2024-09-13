import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@rivet-gg/components';
import { DocsTableOfContents } from '@/components/DocsTableOfContents';

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
      <div className=' w-full  max-w-prose'>
        <Card>
          <CardHeader>
            <CardTitle>Errors</CardTitle>
            <CardDescription>
              Errors that are thrown by this module. Defined by the module author and used to provide more
              context to the user when an error occurs.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            {errors.length > 0 ? (
              errors.map(([id, error]) => (
                <div
                  key={id}
                  className='items-center justify-between rounded-md border p-4 no-underline transition-colors'>
                  <h3>
                    {error.name}
                    <code className='ml-2'>{id}</code>
                  </h3>
                  <p className='text-muted-foreground'>{error.description}</p>
                </div>
              ))
            ) : (
              <p>No errors defined for this module.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className='w-full max-w-sm'>
        <DocsTableOfContents tableOfContents={errorHeaders} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return generateModulesPageParams();
}
