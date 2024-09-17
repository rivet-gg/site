import { Card, CardHeader, CardTitle, CardContent } from '@rivet-gg/components';
import { SchemaPreview } from '@/components/SchemaPreview';
import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import { notFound } from 'next/navigation';
import { DocsTableOfContents } from '@/components/DocsTableOfContents';
import { Code } from '@/components/mdx';
import { CodeBlock } from '@/components/CodeBlock';

export default async function ModuleConfigPage({ params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta } = mod;

  return (
    <div className='flex flex-row justify-between gap-4'>
      <div className='flex w-full  max-w-prose flex-col gap-6'>
        <Card id='config' className='scroll-mt-header'>
          <CardHeader>
            <CardTitle>Config</CardTitle>
          </CardHeader>
          <CardContent>
            <SchemaPreview
              schema={meta.userConfigSchema}
              empty={<p>This module does not define a user config.</p>}
            />
          </CardContent>
        </Card>

        <Card id='default-config' className='scroll-mt-header'>
          <CardHeader>
            <CardTitle>Default Config</CardTitle>
          </CardHeader>
          <CardContent>
            {meta.config.defaultConfig ? (
              <Code language='json'>
                <CodeBlock lang='json' code={JSON.stringify(meta.config.defaultConfig, null, 2)} />
              </Code>
            ) : (
              <p>This module does not have a default config.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className='hidden w-full max-w-sm lg:block'>
        <DocsTableOfContents
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
