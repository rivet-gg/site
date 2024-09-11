import { ActiveLink } from "@/components/ActiveLink";
import { ModuleIcon } from "@/components/ModuleIcon";
import { ModulePageLink } from "@/components/ModulePageLink";
import { safelyLoadModule } from "@/lib/module";
import { notFound } from "next/navigation";

export default async function ModuleLayout({ children, params }) {
    const mod = await safelyLoadModule(params.module);

    if (!mod) {
        return notFound();
    }

    const { meta } = mod;

    const actors = Object.keys(meta.actors || {});
    const scripts = Object.keys(meta.scripts || {});
    const dependencies = Object.keys(meta.dependencies || {});
    const errors = Object.keys(meta.errors || {});

    return (
        <div>
            <h1 className="text-white text-5xl mb-4 flex items-center">
                <ModuleIcon
                    icon={meta.icon}
                    className="mr-4 max-h-12 text-orange-400 block"
                />
                {meta.name}
            </h1>
            <div className="text-white border-b border-cream-100/10 flex gap-0.5">
                <ModulePageLink href={`/modules/${params.module}`}>
                    Overview
                </ModulePageLink>
                <ModulePageLink
                    href={`/modules/${params.module}/config`}
                >
                    Config
                </ModulePageLink>
                <ModulePageLink
                    href={`/modules/${params.module}/scripts`}
                >
                    Scripts {scripts.length > 0 ? <>({scripts.length})</> : ""}
                </ModulePageLink>
                <ModulePageLink
                    href={`/modules/${params.module}/actors`}
                >
                    Actors {actors.length > 0 ? <>({actors.length})</> : ""}
                </ModulePageLink>
                <ModulePageLink
                    href={`/modules/${params.module}/errors`}
                >
                    Errors {errors.length > 0 ? <>({errors.length})</> : ""}
                </ModulePageLink>
                <ModulePageLink
                    href={`/modules/${params.module}/dependencies`}
                >
                    Dependencies{" "}
                    {dependencies.length > 0
                        ? <>({dependencies.length})</>
                        : ""}
                </ModulePageLink>
            </div>
            <div className="pt-6">
                {children}
            </div>
        </div>
    );
}
