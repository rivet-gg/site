'use client';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

export interface ActiveLinkProps<T> extends LinkProps<T> {}

export function ActiveLink<T>(props: ActiveLinkProps<T>) {
  const pathname = usePathname();
  const isActive = pathname === props.href;
  return <Link<T> {...props} aria-current={isActive ? 'page' : undefined} />;
}
