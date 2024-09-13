import { ActiveLink, ActiveLinkProps } from '@/components/ActiveLink';
import { Button } from '@rivet-gg/components';

interface ModulePageLinkProps<T> extends ActiveLinkProps<T> {}

export function ModulePageLink<T>(props: ModulePageLinkProps<T>) {
  return (
    <Button variant='ghost' asChild>
      <ActiveLink<T>
        {...props}
        className="after:content-[' '] aria-current-page:after:bg-primary relative mb-1.5 after:absolute after:inset-x-0 after:-bottom-2 after:z-[-1] after:h-[2px] after:rounded-sm"
      />
    </Button>
  );
}
