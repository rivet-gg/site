'use client';
import { ModuleCard } from '@rivet-gg/components';

export function LinkModuleCard(props) {
  return (
    <ModuleCard {...props} onClick={() => window.history.pushState(null, '', `/modules/${props.name}`)} />
  );
}
