import { ActiveLink } from '@/components/ActiveLink';
import { ModuleIcon } from '@/components/ModuleIcon';
import { ModulePageLink } from '@/components/ModulePageLink';
import { safelyLoadModule } from '@/lib/module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/sharp-solid-svg-icons';
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
      <Link href='/modules' className='mb-4 flex items-center gap-2 text-white/50'>
        <FontAwesomeIcon icon={faArrowLeft} className='size-4' />
        Back to Modules
      </Link>
      <h1 className='mb-4 flex items-center text-5xl text-white'>
        <ModuleIcon icon={meta.config.icon} className='mr-4 block max-h-12 text-orange-400' />
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
      <div className='pt-6'>{children}</div>
    </div>
  );
}
