import { notFound } from "next/navigation";
import { Code, CodeGroup } from "@/components/Code";

export default async function ModulePage({ params, ...props }) {
    const modules = await import(
        `../../../../../vendor/opengb-meta.json`
    );

    const mod = modules.categories.flatMap((category) => category.modules).find(
        (module) => module.id === params.module,
    );

    if (!mod) {
        return notFound();
    }

    const { default: Docs } = await import(
        `../_docs/${params.module}/README.mdx`
    );

    return (
        <div className="flex flex-row gap-4 pt-6 justify-between">
            <div className="max-w-3xl">
                <Docs />
            </div>
            <div className="max-w-sm w-full text-white">
                <h3 className=" -mb-3">
                    Install the module
                </h3>
                <CodeGroup>
                    <Code>
                        {`rivet module add ${mod.id}`}
                    </Code>
                </CodeGroup>

                <h3 className=" text-base mb-3">Authors</h3>
                <section>
                    <ul className=" list-disc list-inside">
                        <li>Nathan</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const modules = await import(
        "../../../../../vendor/opengb-meta.json"
    );

    return modules.categories.map((category) => {
        return category.modules.map((module) => {
            return { module: module.id };
        });
    }).flat();
}
