import { CodeGroup } from '@/components/Code';
import { CodeBlock } from '@/components/CodeBlock';
import { SchemaPreview } from '@/components/SchemaPreview';
import { TableOfContents } from '@/components/TableOfContents';
import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import { notFound } from 'next/navigation';

export default async function ModuleConfigPage({ params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta, configSchema } = mod;

  return (
    <div className='flex flex-row justify-between gap-4'>
      <div className='w-full max-w-3xl'>
        <h2 id='config' className='font-display text-3xl text-white'>
          Config
        </h2>
        <SchemaPreview schema={configSchema} />
        <h2 id='default-config' className='font-display text-3xl text-white'>
          Default Config
        </h2>
        <CodeGroup>
          <div>
            <CodeBlock lang='json' code={JSON.stringify(meta.defaultConfig, null, 2)} />
          </div>
        </CodeGroup>
      </div>
      <div className='w-full max-w-sm'>
        <TableOfContents
          tableOfContents={[
            {
              id: 'config',
              title: 'Config',
              children: []
            },
            {
              id: 'default-config',
              title: 'Default Config',
              children: []
            }
          ]}
        />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return generateModulesPageParams();
}
