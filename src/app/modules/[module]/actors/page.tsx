import { generateModulesPageParams, safelyLoadModule } from '@/lib/module';
import { notFound } from 'next/navigation';

export default async function ModuleActorsPage({ params }) {
  const mod = await safelyLoadModule(params.module);

  if (!mod) {
    return notFound();
  }

  const { meta, Readme } = mod;
}

export async function generateStaticParams() {
  return generateModulesPageParams();
}
