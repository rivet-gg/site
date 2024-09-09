import { TableOfContents } from "@/components/TableOfContents";
import { generateModulesPageParams, safelyLoadModule } from "@/lib/module";
import { notFound } from "next/navigation";

export default async function ModuleErrorsPage({ params }) {
    const mod = await safelyLoadModule(params.module);

    if (!mod) {
        return notFound();
    }

    const { meta } = mod;

    const errors = Array.from(Object.entries<any>(meta.errors || {}));
    const errorHeaders = errors.map(([id, error]) => ({
        id,
        title: error.name,
        children: [],
    }));

    return (
        <div className="flex flex-row gap-4 justify-between">
            <div className="max-w-3xl w-full">
                <h2 className="text-white font-display text-3xl">Errors</h2>
                <div className="prose">
                    {errors.length > 0
                        ? errors.map(([id, error]) => (
                            <div
                                key={id}
                                id={id}
                                className="scroll-mt-header-offset"
                            >
                                <h3>
                                    {error.name}
                                </h3>
                                <code>{id}</code>
                                <p>{error.description}</p>
                                <pre>{error.stack}</pre>
                            </div>
                        ))
                        : <p>No errors defined for this module.</p>}
                </div>
            </div>
            <div className="max-w-sm w-full">
                <TableOfContents
                    tableOfContents={errorHeaders}
                />
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return generateModulesPageParams();
}
