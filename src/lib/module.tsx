import { safeAwait } from '@/lib/safe';
import { loadModuleMeta, loadModulesMeta } from '@rivet-gg/components';

function DefaultReadme() {
  return (
    <div>
      <p>This module does not have a README.</p>
    </div>
  );
}

export async function generateModulesPageParams() {
  const meta = await loadModulesMeta();

  return Object.keys(meta.modules).map(module => {
    return { module };
  });
}

export async function generateModuleSciprtsPageParams() {
  const meta = await loadModulesMeta();

  return Object.entries<any>(meta.modules)
    .map(([id, module]) => {
      return Object.keys(module.scripts).map(script => {
        return { module: id, script };
      });
    })
    .flat();
}

export async function loadReadme(module) {
  try {
    return await import(`../../../modules/modules/${module}/README.mdx`);
  } catch {
    try {
      return await import(`../../../modules/modules/${module}/README.md`);
    } catch {
      return { default: DefaultReadme, tableOfContents: [] };
    }
  }
}

export async function loadModule(module) {
  return await Promise.all([loadReadme(module), loadModuleMeta(module)]);
}

export async function safelyLoadModule(module) {
  const [error, result] = await safeAwait(loadModule(module));

  if (error) {
    return null;
  }

  const [{ default: Readme, tableOfContents: readmeToc }, meta] = result;

  return { meta, Readme, readmeToc };
}

export async function safelyLoadModuleMeta(module) {
  const [error, result] = await safeAwait(loadModuleMeta(module));

  if (error) {
    return null;
  }

  return result;
}
