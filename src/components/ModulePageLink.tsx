import { ActiveLink, ActiveLinkProps } from "@/components/ActiveLink";

interface ModulePageLinkProps<T> extends ActiveLinkProps<T> {
}

export function ModulePageLink<T>(props: ModulePageLinkProps<T>) {
    return (
        <ActiveLink<T>
            {...props}
            className="px-4 mb-1.5 py-1 hover:bg-cream-100/10 transition-colors rounded-md  relative after:content-[' '] after:inset-x-0 after:absolute after:h-[2px] after:rounded-sm  aria-current-page:after:bg-orange-500 after:-bottom-2 after:z-[-1]"
        />
    );
}
