import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, ModuleCard } from '@rivet-gg/components';
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
    <div className='max-w-prose'>
      <Card>
        <CardHeader>
          <CardTitle>Dependencies</CardTitle>
          <CardDescription>
            Dependencies that this module relies on. These dependencies are required for the module to
            function correctly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dependencies.length > 0 ? (
            <ul className='flex gap-4 lg:grid lg:grid-cols-2'>
              {dependencies.map(dep => (
                <li key={dep.name} className='max-w-full'>
                  <Link href={`/modules/${dep.name}`} className='w-full'>
                    <ModuleCard {...dep.config} className='w-full min-w-0' />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No dependencies defined for this module.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export async function generateStaticParams() {
  return generateModulesPageParams();
}
