import { CodeGroup } from "@/components/Code";
import { CodeBlock } from "@/components/CodeBlock";
import { generateModulesPageParams, safelyLoadModule } from "@/lib/module";
import { notFound } from "next/navigation";

export default async function ModuleConfigPage({ params }) {
    const mod = await safelyLoadModule(params.module);

    if (!mod) {
        return notFound();
    }

    const { meta } = mod;

    return (
        <div className="max-w-3xl">
            <h2 className="text-white font-display text-3xl">Default Config</h2>
            <CodeGroup>
                <div>
                    <CodeBlock
                        lang="json"
                        code={JSON.stringify(meta.defaultConfig, null, 2)}
                    />
                </div>
            </CodeGroup>
        </div>
    );
}

export async function generateStaticParams() {
    return generateModulesPageParams();
}
