'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/sharp-solid-svg-icons';
import { useState } from 'react';

export function ModuleScripts({ moduleId, scripts }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const allScripts = Object.values(scripts);

  const scriptsList = isExpanded ? allScripts : allScripts.slice(0, 5);

  return (
    <ul>
      {scriptsList.map(script => (
        <li key={script.name} className='mb-2 rounded-md border p-4'>
          <a
            href={`/modules/${moduleId}/scripts/${script.name}`}
            className='flex flex-row items-center justify-between'>
            <div className='flex flex-col'>
              {script.config.name}
              <p className='text-muted-foreground text-sm'>{script.config.description}</p>
            </div>
            <FontAwesomeIcon icon={faChevronRight} />
          </a>
        </li>
      ))}
      {!isExpanded ? (
        <button className='cursor-pointer appearance-none underline' onClick={() => setIsExpanded(true)}>
          Show more
        </button>
      ) : null}
    </ul>
  );
}
