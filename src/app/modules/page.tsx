import { ModulesStore } from '@/components/ModulesStore';
import { loadModuleCategories } from '@/lib/module';

export default async function ModulesPage() {
  const categories = await loadModuleCategories();

  return <ModulesStore categories={categories} />;
}
