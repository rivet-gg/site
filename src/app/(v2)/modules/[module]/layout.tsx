import { ModuleIcon, Badge, Button } from '@rivet-gg/components';
import { ModulePageLink } from '@/components/ModulePageLink';
import { safelyLoadModule } from '@/lib/module';
import { Icon, faGitAlt, faChevronRight } from '@rivet-gg/icons';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ModuleLayout({ children, params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta } = mod;

  const scripts = Object.keys(meta.scripts || {});
  const dependencies = Object.keys(meta.config.dependencies || {});
  const errors = Object.keys(meta.config.errors || {});

  return (
    <div>
      <div className='flex flex-row justify-between'>
        <ul className='text-muted-foreground my-4 flex flex-wrap items-center gap-2 text-xs'>
          <li>
            <Link href='/modules'>Modules</Link>
          </li>
          <li className='h-2.5'>
            <Icon className='block h-full w-auto' icon={faChevronRight} />
          </li>
          <li>{meta.category.name}</li>
          <li className='h-2.5'>
            <Icon className='block h-full w-auto' icon={faChevronRight} />
          </li>
          <li className='text-foreground font-semibold'>{meta.config.name}</li>
        </ul>

        <Button asChild variant='ghost' className='w-auto self-end' startIcon={<Icon icon={faGitAlt} />}>
          <a
            href={`https://github.com/rivet-gg/modules/tree/main/modules/${params.module}`}
            target='_blank'
            rel='noopener noreferrer'>
            View Source Code
          </a>
        </Button>
      </div>
      <h1 className='mb-4 flex items-center text-3xl font-bold lg:text-5xl'>
        <ModuleIcon icon={meta.config.icon} className='text-primary mr-4 block max-h-12' />
        {meta.config.name}
      </h1>
      <div className='flex gap-0.5 overflow-x-auto border-b'>
        <ModulePageLink href={`/modules/${params.module}`} strict>
          Overview
        </ModulePageLink>
        <ModulePageLink href={`/modules/${params.module}/config`}>Config</ModulePageLink>
        <ModulePageLink href={`/modules/${params.module}/scripts`}>
          Scripts
          {scripts.length > 0 ? (
            <Badge className='ml-2' variant='secondary'>
              {scripts.length}
            </Badge>
          ) : null}
        </ModulePageLink>
        <ModulePageLink href={`/modules/${params.module}/errors`}>
          Errors
          {errors.length > 0 ? (
            <Badge className='ml-2' variant='secondary'>
              {errors.length}
            </Badge>
          ) : null}
        </ModulePageLink>
        <ModulePageLink href={`/modules/${params.module}/dependencies`}>
          Dependencies
          {dependencies.length > 0 ? (
            <Badge className='ml-2' variant='secondary'>
              {dependencies.length}
            </Badge>
          ) : null}
        </ModulePageLink>
      </div>
      <div className='py-6'>{children}</div>
    </div>
  );
}
