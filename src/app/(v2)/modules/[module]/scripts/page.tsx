import { Card, CardTitle, CardHeader, CardContent, Button, CardDescription } from '@rivet-gg/components';
import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/sharp-solid-svg-icons';
import { DocsTableOfContents } from '@/components/DocsTableOfContents';
import { Markdown } from '@/components/Markdown';

function ScriptPage({ id, script, mod }) {
  return (
    <Link
      key={id}
      id={id}
      href={`/modules/${mod}/scripts/${id}`}
      className='scroll-mt-header hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center justify-between rounded-md border p-4 no-underline transition-colors'>
      <div>
        <h3 className='flex flex-col lg:block'>
          {script.config.name}
          <code className='break-all text-xs lg:ml-2'>{id}</code>
        </h3>
        <div className='text-muted-foreground'>
          <Markdown>{script.config.description}</Markdown>
        </div>
      </div>
      <div className='hidden lg:block'>
        <Button variant='icon'>
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </div>
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
      <div className=' flex w-full max-w-prose flex-col gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Public Scripts</CardTitle>
            <CardDescription>
              Scripts that are accessible to game clients and can be called directly via the generated SDK
              endpoints.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            {publicScripts.length > 0 ? (
              publicScripts.map(([id, script]) => (
                <ScriptPage key={id} id={id} mod={params.module} script={script} />
              ))
            ) : (
              <p>No public scripts defined for this module.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Private Scripts</CardTitle>
            <CardDescription>
              Scripts that are only accessible within the backend and cannot be called directly by game
              clients.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            {privateScripts.length > 0 ? (
              privateScripts.map(([id, script]) => (
                <ScriptPage key={id} id={id} mod={params.module} script={script} />
              ))
            ) : (
              <p>No private scripts defined for this module.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className='hidden w-full max-w-sm lg:block'>
        <DocsTableOfContents tableOfContents={toc} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return generateModulesPageParams();
}
