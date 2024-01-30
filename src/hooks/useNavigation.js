import { usePathname } from 'next/navigation';

import routes from '@/generated/routes.json';

export const useNavigation = () => {
  let pathname = usePathname();
  let navigation = routes.routes.find(route => pathname.startsWith(route.prefix)) || {
    prefix: '/',
    feedback: false
  };
  let page = routes.pages[pathname];
  let tableOfContents =
    (navigation?.tableOfContents?.[pathname] ?? true) && page?.headings?.length > 0 ? page?.headings : null;

  return {
    navigation,
    page,
    tableOfContents
  };
};
