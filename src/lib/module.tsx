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
        return await import(`../../../modules/modules/${module}/README.mdx`);
    } catch {
        try {
            return await import(`../../../modules/modules/${module}/README.md`);
        } catch {
            return { default: DefaultReadme };
        }
    }
}

export async function loadModule(module) {
    return await Promise.all([
        import(`../../../modules/modules/${module}/module.json`),
        loadReadme(module),
    ]);
}

export async function safelyLoadModule(module) {
    const [error, result] = await safeAwait(loadModule(module));

    if (error) {
        return null;
    }

    return { meta: result[0].default, Readme: result[1].default };
}
