'use client';
import { ModulesStore as RivetModulesStore } from '@rivet-gg/components';
import { useRouter } from 'next/navigation';

interface ModulesStoreProps {
  categories: any[];
}

export function ModulesStore({ categories }: ModulesStoreProps) {
  const router = useRouter();
  return (
    <RivetModulesStore
      categories={categories}
      onModuleClick={module => router.push(`/modules/${module.name}`)}
    />
  );
}
