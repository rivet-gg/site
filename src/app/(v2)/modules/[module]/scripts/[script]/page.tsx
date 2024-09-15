import { Code, CodeGroup } from '@/components/v2/Code';
import { CodeBlock } from '@/components/CodeBlock';
import { SchemaPreview } from '@/components/SchemaPreview';
import {
  backendModule,
  bashModule,
  frontendModule,
  godotModule,
  unityModule,
  unrealModule
} from '@/lib/codeTemplates';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CopyArea } from '@rivet-gg/components';
import { generateModuleSciprtsPageParams, safelyLoadModule } from '@/lib/module';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ModuleScriptPage({ params: { module, script } }) {
  const mod = await safelyLoadModule(module);

  if (!mod) {
    return notFound();
  }

  const { meta } = mod;

  const scriptMeta = meta.scripts[script];
  if (!scriptMeta) {
    return notFound();
  }

  return (
    <>
      <ul className='text-muted-foreground mb-4 flex flex-wrap items-center gap-2 text-xs'>
        <li className=''>
          <Link href={`/modules/${meta.name}`}>{meta.config.name}</Link>
        </li>
        <li className='h-2.5'>
          <FontAwesomeIcon className='block h-full w-auto' icon={faChevronRight} />
        </li>
        <li>
          <Link href={`/modules/${meta.name}/scripts`}>Scripts</Link>
        </li>
        <li className='h-2.5'>
          <FontAwesomeIcon className='block h-full w-auto' icon={faChevronRight} />
        </li>
        <li className='text-foreground'>{scriptMeta.config.name}</li>
      </ul>
      <div className='flex flex-col justify-between gap-4 lg:flex-row'>
        <div className='flex w-full  max-w-prose flex-col gap-6'>
          <Card>
            <CardHeader>
              <CardTitle>{scriptMeta.config.name}</CardTitle>
              <CardDescription>{scriptMeta.config.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='mb-6 rounded-md border px-4 pb-3'>
                <h3 className='bg-card relative -top-4 mb-0 inline-block text-xl font-bold'>Request</h3>
                <SchemaPreview
                  schema={scriptMeta.requestSchema}
                  empty={<p className='my-4 text-white'>Script does not accept any arguments.</p>}
                />
              </div>
              <div className='rounded-md border px-4 pb-3'>
                <h3 className='bg-card relative -top-4 mb-0 inline-block text-xl font-bold'>Response</h3>

                <SchemaPreview
                  schema={scriptMeta.responseSchema}
                  empty={<p className='my-4 text-white'>Script does not return any data.</p>}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='prose-invert w-full max-w-xl'>
          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
              <CardDescription>
                <p>
                  To use this script, you need to install the module first. Once you have the module
                  installed, you can use this script in your backend code, frontend code, or your favorite
                  game engine.
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className='mb-1 font-semibold'>1. Install the module</h3>
              <CopyArea value={`rivet module add ${module}`} />
              <h3 className='mb-1 mt-4 font-semibold'>2. Use this script</h3>
              <CodeGroup className='my-0'>
                <Code title='Backend Script' language='typescript'>
                  <CodeBlock lang='ts' code={backendModule({ module, script })} />
                </Code>
                <Code title='JavaScript' language='js'>
                  <CodeBlock lang='ts' code={frontendModule({ module, script })} />
                </Code>
                <Code title='Godot' language='gdscript'>
                  <CodeBlock lang='gdscript' code={godotModule({ module, script })} />
                </Code>
                <Code title='Unity' language='csharp'>
                  <CodeBlock lang='c#' code={unityModule({ module, script })} />
                </Code>
                <Code title='Unreal Engine' language='cpp'>
                  <CodeBlock lang='c++' code={unrealModule({ module, script })} />
                </Code>
                <Code title='cUrl' language='bash'>
                  <CodeBlock lang='bash' code={bashModule({ module, script })} />
                </Code>
              </CodeGroup>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return generateModuleSciprtsPageParams();
}
