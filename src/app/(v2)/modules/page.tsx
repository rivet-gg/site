import { ModulesStore } from '@/components/ModulesStore';
import { loadModuleCategories } from '@rivet-gg/components';

export const metadata = {
  title: 'Backend Modules - Rivet',
  description: "Build your game's backend with open-source modules."
};

export default async function ModulesPage() {
  const categories = await loadModuleCategories();

  return (
    <>
      <ModulesStore categories={categories} />
    </>
  );
}
