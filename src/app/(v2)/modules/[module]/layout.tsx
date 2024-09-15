import { ModuleIcon } from '@rivet-gg/components';
import { ModulePageLink } from '@/components/ModulePageLink';
import { safelyLoadModule } from '@/lib/module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/sharp-solid-svg-icons';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ModuleLayout({ children, params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta } = mod;

  const scripts = Object.keys(meta.scripts || {});
  const dependencies = Object.keys(meta.dependencies || {});
  const errors = Object.keys(meta.config.errors || {});

  return (
    <div>
      <ul className='text-muted-foreground my-4 flex items-center gap-2 text-xs'>
        <li>
          <Link href='/modules'>Modules</Link>
        </li>
        <li className='h-2.5'>
          <FontAwesomeIcon className='block h-full w-auto' icon={faChevronRight} />
        </li>
        <li>{meta.category.name}</li>
        <li className='h-2.5'>
          <FontAwesomeIcon className='block h-full w-auto' icon={faChevronRight} />
        </li>
        <li className='text-foreground'>{meta.config.name}</li>
      </ul>
      <h1 className='mb-4 flex items-center text-5xl font-bold text-white'>
        <ModuleIcon icon={meta.config.icon} className='text-primary mr-4 block max-h-12' />
        {meta.config.name}
      </h1>
      <div className='flex gap-0.5 border-b border-cream-100/10 text-white'>
        <ModulePageLink href={`/modules/${params.module}`} strict>
          Overview
        </ModulePageLink>
        <ModulePageLink href={`/modules/${params.module}/config`}>Config</ModulePageLink>
        <ModulePageLink href={`/modules/${params.module}/scripts`}>
          Scripts {scripts.length > 0 ? <>({scripts.length})</> : ''}
        </ModulePageLink>
        <ModulePageLink href={`/modules/${params.module}/errors`}>
          Errors {errors.length > 0 ? <>({errors.length})</> : ''}
        </ModulePageLink>
        <ModulePageLink href={`/modules/${params.module}/dependencies`}>
          Dependencies {dependencies.length > 0 ? <>({dependencies.length})</> : ''}
        </ModulePageLink>
      </div>
      <div className='py-6'>{children}</div>
    </div>
  );
}
