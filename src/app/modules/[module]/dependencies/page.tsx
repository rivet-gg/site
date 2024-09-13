import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ModuleDependenciesPage({ params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta } = mod;

  const dependencies = Object.values<any>(meta.config.dependencies || {});

  return (
    <div className='max-w-3xl'>
      <h2 className='mb-4 font-display text-3xl text-white'>Dependencies</h2>
      <div className='prose '>
        {dependencies.length > 0 ? (
          <ul>
            {dependencies.map(dep => (
              <li key={dep.name}>
                <Link href={`/modules/${dep.name}`}>{dep.config.name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No dependencies defined for this module.</p>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return generateModulesPageParams();
}
