export default function ModuleScriptsPage() {
    return "scripts";
}

export async function generateStaticParams() {
    const modules = await import(
        "../../../../../../vendor/opengb-meta.json"
    );

    return modules.categories.map((category) => {
        return category.modules.map((module) => {
            return { module: module.id };
        });
    }).flat();
}
