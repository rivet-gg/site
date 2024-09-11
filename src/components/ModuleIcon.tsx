import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';
import { type IconPack, library } from '@fortawesome/fontawesome-svg-core';

const fasFab: IconPack = Object.fromEntries(
  Object.entries(fab).map(([iconName, icon]) => [iconName, { ...icon, prefix: 'fas' }])
);

library.add(fasFab, fas);

export function ModuleIcon({ className, icon }) {
  return <FontAwesomeIcon icon={icon} className={className} />;
}
