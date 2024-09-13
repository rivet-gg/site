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
import { generateModuleSciprtsPageParams, safelyLoadModule } from '@/lib/module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/sharp-solid-svg-icons';
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
      <Link className='mb-4 flex items-center gap-2 text-white/50' href={`/modules/${module}/scripts`}>
        <FontAwesomeIcon icon={faArrowLeft} className='size-4' /> Back to Scripts
      </Link>
      <div className='flex flex-row justify-between gap-4'>
        <div className='w-full max-w-3xl'>
          <h2 className='font-display text-3xl text-white'>{scriptMeta.config.name}</h2>
          <p className='mb-6 text-white'>{scriptMeta.config.description}</p>

          <h3 className='mb-2 font-display text-2xl text-white'>Request</h3>
          <SchemaPreview
            schema={scriptMeta.requestSchema}
            empty={<p className='my-4 text-white'>Script does not accept any arguments.</p>}
          />

          <h3 className='mb-2 mt-4 font-display text-2xl text-white'>Response</h3>
          <SchemaPreview
            schema={scriptMeta.responseSchema}
            empty={<p className='my-4 text-white'>Script does not return any data.</p>}
          />
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
