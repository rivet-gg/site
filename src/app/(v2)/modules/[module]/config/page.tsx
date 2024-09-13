import { Card, CardHeader, CardTitle, CardContent } from '@rivet-gg/components';
import { CodeGroup } from '@/components/Code';
import { CodeBlock } from '@/components/CodeBlock';
import { SchemaPreview } from '@/components/SchemaPreview';
import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import { notFound } from 'next/navigation';
import { DocsTableOfContents } from '@/components/DocsTableOfContents';

export default async function ModuleConfigPage({ params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta } = mod;

  return (
    <div className='flex flex-row justify-between gap-4'>
      <div className=' flex w-full  max-w-prose flex-col gap-6'>
        <Card>
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

        <Card>
          <CardHeader>
            <CardTitle>Default Config</CardTitle>
          </CardHeader>
          <CardContent>
            {meta.config.defaultConfig ? (
              <CodeGroup>
                <div>
                  <CodeBlock lang='json' code={JSON.stringify(meta.config.defaultConfig, null, 2)} />
                </div>
              </CodeGroup>
            ) : (
              <p>This module does not have a default config.</p>
            )}
          </CardContent>
        </Card>
      </div>
      <div className='w-full max-w-sm'>
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
