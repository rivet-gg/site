import { CodeGroup, EphermeralTab } from '@/components/Code';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@rivet-gg/components';
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
      <ul className='text-muted-foreground mb-4 flex items-center gap-2 text-xs'>
        <li>
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
      <div className='flex flex-row justify-between gap-4'>
        <div className=' flex w-full  max-w-prose flex-col gap-6'>
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
        <div className='w-full max-w-xl'>
          <CodeGroup title='Install this module'>
            <div>
              <CodeBlock lang='bash' code={`rivet module add ${module}`} />
            </div>
          </CodeGroup>
          <CodeGroup title='Use this module'>
            <EphermeralTab title='Backend Script'>
              <CodeBlock lang='ts' code={backendModule({ module, script })} />
            </EphermeralTab>
            <EphermeralTab title='JavaScript'>
              <CodeBlock lang='ts' code={frontendModule({ module, script })} />
            </EphermeralTab>
            <EphermeralTab title='Godot'>
              <CodeBlock lang='gdscript' code={godotModule({ module, script })} />
            </EphermeralTab>
            <EphermeralTab title='Unity'>
              <CodeBlock lang='c#' code={unityModule({ module, script })} />
            </EphermeralTab>
            <EphermeralTab title='Unreal Engine'>
              <CodeBlock lang='c++' code={unrealModule({ module, script })} />
            </EphermeralTab>
            <EphermeralTab title='cUrl'>
              <CodeBlock lang='bash' code={bashModule({ module, script })} />
            </EphermeralTab>
          </CodeGroup>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return generateModuleSciprtsPageParams();
}
