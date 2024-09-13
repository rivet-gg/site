import { ModuleIcon } from "@/components/ModuleIcon";
import { safelyLoadModule } from "@/lib/module";
import Link from "next/link";
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
            <h1 className="text-white text-5xl mb-4">
                <ModuleIcon icon={meta.icon} className="mr-4 text-orange-400" />
                {meta.name}
            </h1>
            <div className="text-white border-b border-cream-100/10 py-3">
                <Link className="pr-4" href={`/modules/${params.module}`}>
                    Overview
                </Link>
                <Link
                    className="pr-4"
                    href={`/modules/${params.module}/config`}
                >
                    Config
                </Link>
                <Link
                    className="pr-4"
                    href={`/modules/${params.module}/scripts`}
                >
                    Scripts {scripts.length > 0 ? <>({scripts.length})</> : ""}
                </Link>
                <Link
                    className="pr-4"
                    href={`/modules/${params.module}/actors`}
                >
                    Actors {actors.length > 0 ? <>({actors.length})</> : ""}
                </Link>
                <Link
                    className="pr-4"
                    href={`/modules/${params.module}/errors`}
                >
                    Errors {errors.length > 0 ? <>({errors.length})</> : ""}
                </Link>
                <Link
                    className="pr-4"
                    href={`/modules/${params.module}/dependencies`}
                >
                    Dependencies{" "}
                    {dependencies.length > 0
                        ? <>({dependencies.length})</>
                        : ""}
                </Link>
            </div>
            <div className="pt-6">
                {children}
            </div>
        </div>
    );
}
