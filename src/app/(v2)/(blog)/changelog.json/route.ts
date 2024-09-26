import { loadArticles } from "@/lib/article";
import { NextResponse } from "next/server";

export async function GET() {
    const articles = await loadArticles();

    const entries = articles.filter((article) =>
        article.category.id === "changelog"
    );

    const response = entries
        .sort((a, b) => b.published - a.published)
        .map((entry) => ({
            title: entry.title,
            description: entry.description,
            slug: entry.slug,
            published: entry.published,
        }));

    return NextResponse.json(response);
}
