"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export interface ActiveLinkProps<T> extends LinkProps<T> {
    strict?: boolean;
}

export function ActiveLink<T>({ strict, ...props }: ActiveLinkProps<T>) {
    const pathname = usePathname() || "";
    const isActive = strict ? pathname === props.href : pathname?.startsWith(
        typeof props.href === "string" ? props.href : props.href.pathname || "",
    );
    return <Link<T> {...props} aria-current={isActive ? "page" : undefined} />;
}
