import { Card } from '@/components/Card';
import { ModuleIcon } from '@/components/ModuleIcon';

export function ModuleCard({ icon, name, description }) {
  return (
    <Card className='hover:border-orange-500'>
      <ModuleIcon icon={icon} className='text-2xl text-orange-500' />
      <h4 className='text-xl font-bold'>{name}</h4>
      <p className='max-w-full break-words text-white/80'>{description}</p>
    </Card>
  );
}
