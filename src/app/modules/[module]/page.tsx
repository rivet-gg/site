import { notFound } from "next/navigation";
import { Code, CodeGroup } from "@/components/Code";
import { Prose } from "@/components/Prose";
import { generateModulesPageParams, safelyLoadModule } from "@/lib/module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGit, faGitAlt } from "@fortawesome/free-brands-svg-icons";

export default async function ModulePage({ params }) {
    const mod = await safelyLoadModule(params.module);

    if (!mod) {
        return notFound();
    }

    const { meta, Readme } = mod;

    return (
        <div className="flex flex-row gap-4 justify-between">
            <div className="max-w-3xl">
                <Prose>
                    <Readme />
                </Prose>
            </div>
            <div className="max-w-sm w-full text-white">
                <h3 className=" -mb-3">
                    Install the module
                </h3>
                <CodeGroup>
                    <Code>
                        {`rivet module add ${params.module}`}
                    </Code>
                </CodeGroup>

                <h3 className=" text-base mb-3">Authors</h3>
                <section className="prose mb-3">
                    <ul>
                        {meta.authors.map((author) => (
                            <li key={author}>
                                <a href={`https://github.com/${author}`}>
                                    {author}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="prose mb-3">
                    <a href="https://github.com/rivet-gg/modules">
                        <FontAwesomeIcon icon={faGitAlt} /> View Source Code
                    </a>
                </section>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    return generateModulesPageParams();
}
