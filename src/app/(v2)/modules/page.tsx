import { ModulesStore } from '@/components/ModulesStore';
import { loadModuleCategories } from '@rivet-gg/components';

export default async function ModulesPage() {
  const categories = await loadModuleCategories();

  return (
    <>
      <ModulesStore categories={categories} />
    </>
  );
}
