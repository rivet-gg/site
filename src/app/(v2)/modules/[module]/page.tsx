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

export const generateMetadata = async ({ params }) => {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  return {
    title: `${mod.meta.config.name} - Backend Module - Rivet`,
    description: mod.meta.config.description
  };
};

export default async function ModulePage({ params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta, Readme, readmeToc } = mod;

  return (
    <div className='flex flex-col justify-between gap-4 lg:flex-row'>
      <div className='w-full max-w-prose'>
        <Prose>
          <Readme />
        </Prose>
      </div>
      <div className='flex w-full max-w-sm flex-col gap-4'>
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
