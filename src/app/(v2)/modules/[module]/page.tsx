import { notFound } from 'next/navigation';
import { Code, CodeGroup } from '@/components/Code';
import { Prose } from '@/components/Prose';
import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGitAlt } from '@fortawesome/free-brands-svg-icons';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
  CopyArea,
  WithTooltip,
  Button
} from '@rivet-gg/components';

export default async function ModulePage({ params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta, Readme } = mod;

  return (
    <div className='flex flex-col justify-between gap-4 lg:flex-row'>
      <div className='max-w-prose'>
        <Card>
          <CardContent className='p-6'>
            <Prose>
              <Readme />
            </Prose>
          </CardContent>
        </Card>
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
            <ul className='flex'>
              {meta.config.authors.map(author => (
                <li key={author} className='-mr-4'>
                  <a href={`https://github.com/${author}`}>
                    <WithTooltip
                      content={author}
                      trigger={
                        <Avatar>
                          <AvatarFallback>{author[0]}</AvatarFallback>
                          <AvatarImage src={`https://github.com/${author}.png`} alt={author} />
                        </Avatar>
                      }
                    />
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Button
          asChild
          variant='ghost'
          className='w-auto self-end'
          startIcon={<FontAwesomeIcon icon={faGitAlt} />}>
          <a
            href={`https://github.com/rivet-gg/modules/tree/main/modules/${params.module}`}
            target='_blank'
            rel='noopener noreferrer'>
            View Source Code
          </a>
        </Button>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return generateModulesPageParams();
}
