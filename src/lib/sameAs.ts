export const CORE_DIRECTORIES = ['core', 'general'];

export const ENGINES = ['godot', 'unity', 'unreal', 'html5'];

export function getAliasedSlug(slug: string[]) {
  if (ENGINES.includes(slug[0]) && CORE_DIRECTORIES.includes(slug[1])) {
    slug = slug.slice(1);
  }
  return slug;
}

export function getAliasedHref(href: string) {
  const [_, __, ...slug] = href.split('/');
  const aliasedSlug = getAliasedSlug(slug);
  return '/docs/' + aliasedSlug.join('/');
}
