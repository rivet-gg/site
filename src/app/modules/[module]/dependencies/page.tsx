import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ModuleDependenciesPage({ params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta, Readme } = mod;

  const dependencies = Object.keys(meta.dependencies || {});

  return (
    <div className='max-w-3xl'>
      <h2 className='mb-4 font-display text-3xl text-white'>Dependencies</h2>
      <div className='prose'>
        <ul>
          {dependencies.map(dep => (
            <li key={dep}>
              <Link href={`/modules/${dep}`}>{dep}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return generateModulesPageParams();
}
