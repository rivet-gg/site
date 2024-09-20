import { ResourceGroup, Resource } from '@/components/Resources';
import { Icon, faRocket, faBooks, faStopwatch } from '@rivet-gg/icons';

export function LearnHome({ engineId, engineName, tutorials }) {
  return (
    <>
      <ResourceGroup title={null} columns={2}>
        <Resource title='Crash Course' icon={faRocket} href={`/docs/${engineId}/tutorials/crash-course`}>
          {`Speedrun integrating Rivet in to your ${engineName} game.`}
        </Resource>
        <Resource title='API Documentation' icon={faBooks} href='/docs/matchmaker'>
          {`Already know what you're doing? Jump straight to the docs.`}
        </Resource>
      </ResourceGroup>

      <ResourceGroup title='Tutorials' columns={2}>
        {tutorials.map(x => (
          <Resource key={x.id} title={x.title} href={`/docs/${engineId}/tutorials/${x.id}`}>
            {x.details}
            <br />
            <Icon icon={faStopwatch} /> {x.duration}
          </Resource>
        ))}
      </ResourceGroup>
    </>
  );
}
