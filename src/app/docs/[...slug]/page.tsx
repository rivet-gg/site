/**
 * This file is a proxy for the MDX files in the docs directory.
 * It loads the MDX file based on the slug and renders it.
 * It also generates the metadata for the page.
 * We avoid using the new `page.mdx` convention because its harder to navigate the docs when editing.
 * Also, importing the MDX files directly allow us to use other exports from the MDX files.
 */

import path from "node:path";
import fs from "node:fs/promises";
import { CORE_DIRECTORIES, ENGINES, getAliasedSlug } from "@/lib/sameAs";

function createParamsForFile(file) {
    return {
        slug: [
            ...file.replace("index.mdx", "").replace(".mdx", "").split("/"),
        ],
    };
}

async function loadContent(slug: string[]) {
    const newSlug = getAliasedSlug(slug);
    try {
        return await import("@/docs/" + newSlug.join("/") + ".mdx");
    } catch {
        return await import("@/docs/" + newSlug.join("/") + "/index.mdx");
    }
}

export async function generateMetadata({ params: { slug } }) {
    const { title } = await loadContent(slug);
    return {
        title: title,
    };
}

export default async function CatchAllCorePage({ params: { slug } }) {
    const { default: Content } = await loadContent(slug);
    return <Content />;
}

export async function generateStaticParams() {
    const dir = path.join(process.cwd(), "src/docs");

    const dirs = await fs.readdir(dir, { recursive: true });
    const files = dirs.filter((file) => file.endsWith(".mdx"));

    const staticParams = files.map((file) => {
        return createParamsForFile(file);
    });

    const coreResources = CORE_DIRECTORIES.flatMap((dir) =>
        files.filter((file) => file.startsWith(dir))
    );
    for (const engine of ENGINES) {
        staticParams.push(...coreResources.map((file) => {
            return createParamsForFile(`${engine}/${file}`);
        }));
    }

    return staticParams;
}
