import { notFound } from 'next/navigation';
import { Prose } from '@/components/Prose';
import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
  CopyArea
} from '@rivet-gg/components';
import { ModuleScripts } from '@/components/ModuleScripts';
import { DocsTableOfContents } from '@/components/DocsTableOfContents';
import { Metadata } from 'next';

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  return {
    title: `${mod.meta.config.name} - Backend Module - Rivet`,
    description: mod.meta.config.description,
    openGraph: {
      images: [
        {
          url: `/modules/${mod.meta.name}/opengraph-image.png`,
          width: 1200,
          height: 630,
          alt: mod.meta.config.name
        }
      ]
    }
  };
};

export default async function ModulePage({ params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta, Readme, readmeToc } = mod;

  return (
    <div className='flex flex-col justify-between gap-4  lg:flex-row'>
      <div className='order-2 w-full max-w-prose lg:order-1'>
        <Prose>
          <Readme />
        </Prose>
      </div>
      <div className='order-1 flex w-full flex-col gap-4 lg:order-2 lg:max-w-sm'>
        <Card>
          <CardHeader>
            <CardTitle>Install the module</CardTitle>
          </CardHeader>
          <CardContent>
            <CopyArea value={`rivet module add ${meta.name}`}></CopyArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Authors</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {meta.config.authors.map(author => (
                <li key={author} className='mb-2'>
                  <a href={`https://github.com/${author}`} className='flex items-center gap-2'>
                    <Avatar>
                      <AvatarFallback>{author[0]}</AvatarFallback>
                      <AvatarImage src={`https://github.com/${author}.png`} alt={author} />
                    </Avatar>
                    {author}
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scripts</CardTitle>
          </CardHeader>
          <CardContent>
            <ModuleScripts moduleId={meta.name} scripts={meta.scripts} />
          </CardContent>
        </Card>

        <DocsTableOfContents tableOfContents={readmeToc} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return generateModulesPageParams();
}
