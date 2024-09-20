import Link from 'next/link';
import { Heading } from '@/components/Heading';
import { Accordion } from '@/components/Accordion';
import { safelyLoadModuleMeta } from '@/lib/module';
import NextImage from 'next/image';
import { Icon, faExclamationTriangle, faInfoCircle, faLightbulbOn } from '@rivet-gg/icons';

export { ButtonGroup, Button } from '@/components/Button';
export { ResourceGroup, Resource } from '@/components/Resources';
export { Snippet } from '@/components/Snippet';
export { Summary } from '@/components/Summary';
export { Accordion, AccordionGroup } from '@/components/Accordion';
export * from '@/components/callouts';
export { ArticleHeader } from '@/components/ArticleHeader';
export { ArticleSocials } from '@/components/ArticleSocials';
import { CodeBlock } from '@/components/CodeBlock';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  CtaCard,
  Badge,
  ModuleCard as RivetModuleCard
} from '@rivet-gg/components';

export * from '@/components/Tabs';
export { Steps, Step } from '@/components/Steps';
import { SchemaPreview as Schema } from '@/components/SchemaPreview';
export * from '@/components/v2/Code';

export const a = Link;

export const Image = props => <NextImage {...props} />;

export const h2 = function H2(props) {
  return <Heading level={2} {...props} />;
};

export const h3 = function H3(props) {
  return <Heading level={3} {...props} />;
};

export const table = function Table(props) {
  return (
    <div className='overflow-x-auto'>
      <table {...props} />
    </div>
  );
};

export function Tooltip({ tip, children }) {
  return (
    <span className='group/tooltip relative z-10 inline'>
      <span className='underline decoration-cream-400 decoration-dotted decoration-2 underline-offset-4 dark:decoration-charcole-500'>
        {children}
      </span>
      <span className='absolute bottom-full left-1/2 z-40 mb-0.5 hidden w-max max-w-[16rem] -translate-x-1/2 border border-cream-100 bg-charcole-950 px-1.5 py-1 pb-1 text-center text-xs leading-tight text-cream-100 opacity-100 group-hover/tooltip:flex'>
        {tip}
      </span>
    </span>
  );
}

export function ComingSoon() {
  return <Note>Documentation coming very soon!</Note>;
}

export function Outdated() {
  return <Info>🚧 This documentation page is no longer maintained and potentially outdated 🚧</Info>;
}

export function WorkInProgress() {
  return <Info>🚧 This documentation page is a work in progress 🚧</Info>;
}

export function EnvTokenClient() {
  return (
    <Info>
      <p>
        In development,&nbsp;<code>RIVET_TOKEN</code> will use the development token generated by{' '}
        <code>rivet run</code>. In production,&nbsp;<code>RIVET_TOKEN</code> will be automatically added by
        the CDN.
      </p>

      <p>More info:</p>

      <ul>
        <li>
          <Link href='/docs/general/concepts/handling-game-tokens'>Handling game tokens</Link>
        </li>
        <li>
          <Link href='/docs/general/concepts/dev-tokens'>Development tokens</Link>
        </li>
        <li>
          <Link href='/docs/general/concepts/token-types#namespace-public'>Public tokens</Link>
        </li>
      </ul>
    </Info>
  );
}

export function EnvTokenServer() {
  return (
    <Info>
      <p>
        In development, <code>RIVET_TOKEN</code> will use the development token generated by{' '}
        <code>rivet run</code>. In production,&nbsp;<code>RIVET_TOKEN</code> is automatically added to your
        environment by Rivet.
      </p>

      <p>More info:</p>

      <ul>
        <li>
          <Link href='/docs/general/concepts/handling-game-tokens'>Handling game tokens</Link>
        </li>
        <li>
          <Link href='/docs/general/concepts/dev-tokens'>Development tokens</Link>
        </li>
      </ul>
    </Info>
  );
}

export function PreRivetBranch() {
  return (
    <Info>
      <p>
        The <code>pre-rivet</code> branch contains the source code of this project without Rivet implemented,
        in contrast to the <code>main</code> branch. View these side by side to get a good picture of what it
        takes to integrate Rivet for your game.
      </p>
    </Info>
  );
}

export function ProtocolSupportMatrix() {
  return (
    <table>
      <tr>
        <th>Protocol</th>
        <th>
          <Link href='/docs/general/dynamic-servers/game-guard'>Rivet Game Guard</Link>
        </th>
        <th>
          <Link href='/docs/general/dynamic-servers/host-bridge-networking'>
            Host Network (Open Source & Enterprise)
          </Link>
        </th>
      </tr>
      <tr>
        <td></td>
        <td>
          <em>Requires single port</em>
        </td>
        <td>
          <em>Requires port range</em>
        </td>
      </tr>
      <tr>
        <td>HTTPS / Secure WebSocket</td>
        <td>✅</td>
        <td></td>
      </tr>
      <tr>
        <td>HTTP / WebSocket</td>
        <td>✅</td>
        <td></td>
      </tr>
      <tr>
        <td>TCP + TLS</td>
        <td>✅</td>
        <td></td>
      </tr>
      <tr>
        <td>TCP</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
      <tr>
        <td>UDP / WebRTC / ENet / KCP</td>
        <td>✅</td>
        <td>✅</td>
      </tr>
    </table>
  );
}

export function InstallCli() {
  return (
    <Note>
      Make sure you have installed the Rivet CLI{' '}
      <Link href='https://github.com/rivet-gg/cli#installing' target='_blank'>
        here
      </Link>
      .
    </Note>
  );
}

export function AutomateWithApi() {
  return (
    <Accordion title='Can I automate this with APIs?'>
      <p>
        Rivet&apos;s Cloud API can be managed with your{' '}
        <Link href='/docs/general/concepts/token-types#cloud'>cloud token</Link>. This is the same API we use
        internally and{' '}
        <Link href='https://github.com/rivet-gg/cli/blob/7f91d180f64b755956d89a3a83bfb2e77a42d72d/cli/src/commands/version.rs#L368'>
          in the CLI
        </Link>
        .
      </p>

      <p>
        The Cloud REST API is documented <Link href='/docs/cloud'>here</Link>. You can also use the{' '}
        <Link href='https://www.npmjs.com/package/@rivet-gg/api-full' target='_blank'>
          <code>@rivet-gg/api-full</code> NPM library
        </Link>{' '}
        to interact with the Cloud API.
      </p>
    </Accordion>
  );
}

export function CrashCourseUnrealBlueprint() {
  return null;
  return (
    <Tip>
      <p>TODO: Unreal crash blueprints course</p>
      <ul>
        <li>Comments</li>
        <li>3 ways to create nodes</li>
      </ul>
    </Tip>
  );
}

export function CrashCourseUnrealWidget() {
  return null;
  return (
    <Tip>
      <p>TODO: Unreal crash blueprints course</p>
      <ul>
        <li>How to create a UI</li>
        <li>Common widget types</li>
      </ul>
    </Tip>
  );
}

export function WhatDoesRivetDo() {
  return (
    <Accordion title='What did this do?'>
      <ul>
        <li>Linked your project to Rivet</li>
        <li>
          If no <code>rivet.yaml</code> was present, it created a <code>rivet.yaml</code> file that configures
          how to run your game. Read more about the Rivet version config{' '}
          <a href='/docs/general/concepts/version-config'>here</a>.
        </li>
        <li>
          Added a development token to your <code>.env</code> that lets you develop with Rivet on your local
          machine. Read more about dev tokens <a href='/docs/general/concepts/dev-tokens'>here</a>.
        </li>
      </ul>
      <p>
        You can also run <code>rivet init</code> without any flags to go through the interactive setup
        process.
      </p>
    </Accordion>
  );
}

export function UnfamiliarWithDockerfiles() {
  return (
    <Accordion title='Unfamiliar with Dockerfiles?'>
      <ul>
        <li>
          <a href='https://github.com/gauthamp10/dockerfile-boilerplates'>
            Boilerplate <code>Dockerfiles</code>
          </a>{' '}
          has one already written for you
        </li>
        <li>
          <a href='https://docker-curriculum.com/#dockerfile'>Dockerfile Crash Course</a> will teach you how
          to write your own <code>Dockerfile</code> quickly
        </li>
        <li>
          Join our <a href='https://discord.gg/BG2vqsJczH'>Discord</a> and we&apos;ll write your{' '}
          <code>Dockerfile</code> for you!
        </li>
      </ul>
    </Accordion>
  );
}

export const ExperimentalFeature = () => {
  return <Warning>This feature is experimental and may change in the future.</Warning>;
};

export const Version = () => {
  const version = '0.1.5';
  return (
    <CodeBlock
      lang='bash'
      code={`deno install -n opengb -fgA https://raw.githubusercontent.com/rivet-gg/opengb/v${version}/src/cli/main.ts`}
    />
  );
};

export const Card = ({ title, href }) => {
  if (href) {
    return (
      <Link href={href} className='h-full'>
        <CtaCard className='h-full' title={title} />
      </Link>
    );
  }
};

export const CardGroup = ({ children }) => {
  return <div className='not-prose grid grid-cols-2 gap-4'>{children}</div>;
};

export const SchemaPreview = ({ schema }) => {
  return (
    <div className='not-prose rounded-md border p-4'>
      <Schema schema={schema} />
    </div>
  );
};

export const Warning = ({ title = 'Heads up!', children }) => {
  return (
    <Alert variant='warning' className='my-4'>
      <AlertTitle className='flex items-center'>
        <Icon icon={faExclamationTriangle} className='text-warning mr-2' />
        {title}
      </AlertTitle>
      <AlertDescription className='prose-invert prose'>{children}</AlertDescription>
    </Alert>
  );
};

export const Tip = ({ title = 'Might be useful!', children }) => {
  return (
    <Alert className='my-4'>
      <AlertTitle className='flex items-center'>
        <Icon icon={faLightbulbOn} className='text-primary mr-2' />
        {title}
      </AlertTitle>
      <AlertDescription className='prose-invert prose'>{children}</AlertDescription>
    </Alert>
  );
};

export const Info = ({ title = 'Heads up!', children }) => {
  return (
    <Alert className='my-4'>
      <AlertTitle className='flex items-center'>
        <Icon icon={faInfoCircle} className='mr-2' />
        {title}
      </AlertTitle>
      <AlertDescription className='prose-invert prose'>{children}</AlertDescription>
    </Alert>
  );
};

export const Note = ({ children }) => {
  return (
    <Alert variant='info' className='my-4'>
      <AlertTitle className='prose-invert flex items-center [&_p]:first-of-type:my-0'>
        <Icon icon={faInfoCircle} className='mr-2' />
        {children}
      </AlertTitle>
    </Alert>
  );
};

export const Tags = ({ tags }) => {
  return (
    <div className='flex flex-wrap gap-1'>
      {tags.map(tag => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  );
};

export const ModuleCard = async ({ module }) => {
  const meta = await safelyLoadModuleMeta(module);

  return <RivetModuleCard className='w-full' {...meta.config} />;
};
