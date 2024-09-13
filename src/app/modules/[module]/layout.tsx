import { ModuleIcon } from "@/components/ModuleIcon";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ModuleLayout({ children, params }) {
    const modules = await import(
        `../../../../../vendor/opengb-meta.json`
    );

    const mod = modules.categories.flatMap((category) => category.modules).find(
        (module) => module.id === params.module,
    );

    if (!mod) {
        return notFound();
    }

    return (
        <div>
            <h1 className="text-white text-5xl mb-4">
                <ModuleIcon icon={mod.icon} className="mr-4 text-orange-400" />
                {mod.name}
            </h1>
            <div className="text-white border-b border-cream-100/10 py-3">
                <Link className="pr-4" href={`/docs/modules/${mod.id}`}>
                    Overview
                </Link>
                <Link
                    className="pr-4"
                    href={`/docs/modules/${mod.id}/config`}
                >
                    Config
                </Link>
                <Link
                    className="pr-4"
                    href={`/docs/modules/${mod.id}/scripts`}
                >
                    Scripts
                </Link>
                <Link
                    className="pr-4"
                    href={`/docs/modules/${mod.id}/errors`}
                >
                    Errors
                </Link>
                <Link
                    className="pr-4"
                    href={`/docs/modules/${mod.id}/dependencies`}
                >
                    Dependencies
                </Link>
            </div>
            {children}
        </div>
    );
}
