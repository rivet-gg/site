import { CodeGroup } from "@/components/Code";
import { CodeBlock } from "@/components/CodeBlock";
import { SchemaPreview } from "@/components/SchemaPreview";
import { TableOfContents } from "@/components/TableOfContents";
import { generateModulesPageParams, safelyLoadModule } from "@/lib/module";
import { notFound } from "next/navigation";

export default async function ModuleConfigPage({ params }) {
    const mod = await safelyLoadModule(params.module);

    if (!mod) {
        return notFound();
    }

    const { meta, configSchema } = mod;

    return (
        <div className="flex flex-row gap-4 justify-between">
            <div className="max-w-3xl w-full">
                <h2 id="config" className="text-white font-display text-3xl">
                    Config
                </h2>
                <SchemaPreview schema={configSchema} />
                <h2
                    id="default-config"
                    className="text-white font-display text-3xl"
                >
                    Default Config
                </h2>
                <CodeGroup>
                    <div>
                        <CodeBlock
                            lang="json"
                            code={JSON.stringify(meta.defaultConfig, null, 2)}
                        />
                    </div>
                </CodeGroup>
            </div>
            <div className="max-w-sm w-full">
                <TableOfContents
                    tableOfContents={[{
                        id: "config",
                        title: "Config",
                        children: [],
                    }, {
                        id: "default-config",
                        title: "Default Config",
                        children: [],
                    }]}
                />
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return generateModulesPageParams();
}
