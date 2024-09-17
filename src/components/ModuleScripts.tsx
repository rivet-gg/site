import { Markdown } from '@/components/Markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/sharp-solid-svg-icons';
import Link from 'next/link';

export function ModuleScripts({ moduleId, scripts }) {
  const allScripts = Object.values<any>(scripts);
  return (
    <ul>
      {allScripts.slice(0, 5).map(script => (
        <li key={script.name} className='mb-2 rounded-md border p-4'>
          <a
            href={`/modules/${moduleId}/scripts/${script.name}`}
            className='flex flex-row items-center justify-between'>
            <div className='flex flex-col'>
              {script.config.name}
              <div className='text-muted-foreground text-sm'>
                <Markdown>{script.config.description}</Markdown>
              </div>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </a>
        </li>
      ))}
      {allScripts.length > 5 ? (
        <Link className='cursor-pointer appearance-none underline' href={`/modules/${moduleId}`}>
          Show more
        </Link>
      ) : null}
    </ul>
  );
}
