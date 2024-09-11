import { safeAwait } from "@/lib/safe";
import fs from "node:fs/promises";
import path from "node:path";

const DefaultReadme = () => {
    return (
        <div className="prose">
            <p>This module does not have a README.</p>
        </div>
    );
};

export async function generateModulesPageParams() {
    const dir = path.join(process.cwd(), "../modules/modules");

    const dirs = await fs.readdir(dir);

    return dirs.map((dir) => {
        return { module: dir };
    });
}

export async function loadReadme(module) {
    try {
        return (await import(`../../../modules/modules/${module}/README.mdx`))
            .default;
    } catch {
        try {
            return (await import(
                `../../../modules/modules/${module}/README.md`
            )).default;
        } catch {
            return { default: DefaultReadme };
        }
    }
}

export async function loadModule(module) {
    return await Promise.all([
        import(`../../../modules/modules/${module}/module.json`),
        loadReadme(module),
        loadModuleMeta(module),
    ]);
}

export async function loadModulesOpenAPI() {
    return await import(
        `../../../modules/tests/basic/.opengb/openapi.json`
    );
}

export async function loadModulesMeta() {
    return await import(`../../../modules/tests/basic/.opengb/meta.json`);
}

export async function loadModuleMeta(module) {
    const meta = await loadModulesMeta();
    return meta.modules[module];
}

export async function safelyLoadModule(module) {
    const [error, result] = await safeAwait(loadModule(module));

    if (error) {
        return null;
    }

    const [meta, Readme, globalMeta] = result;

    return { meta, Readme, configSchema: globalMeta.userConfigSchema };
}
