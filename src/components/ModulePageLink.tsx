import { ActiveLink, ActiveLinkProps } from '@/components/ActiveLink';

interface ModulePageLinkProps<T> extends ActiveLinkProps<T> {}

export function ModulePageLink<T>(props: ModulePageLinkProps<T>) {
  return (
    <ActiveLink<T>
      {...props}
      className="after:content-[' '] relative mb-1.5 rounded-md px-4  py-1 transition-colors after:absolute after:inset-x-0 after:-bottom-2 after:z-[-1] after:h-[2px]  after:rounded-sm hover:bg-cream-100/10 aria-current-page:after:bg-orange-500"
    />
  );
}
