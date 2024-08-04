import React from 'react';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import egg from '@/images/graphics/egg.png';
import cube from '@/images/graphics/geocorp/cube.svg';
import overlapCircles from '@/images/graphics/geocorp/overlap-circles.svg';
import portal from '@/images/graphics/geocorp/portal.svg';
import switchLines from '@/images/graphics/geocorp/switch-lines.svg';
import {
    faShield,
  faServer,
  faChessKnight,
  faShieldAlt,
  faChartLine,
  faBug,
  faPlug,
  faUser,
  faEnvelope,
  faSignInAlt,
  faUserFriends,
  faPuzzle,
  faCode,
  faDatabase,
  faEngine,
  faGameConsoleHandheld,
  faSwap,
  faArrowRight
} from '@fortawesome/sharp-solid-svg-icons';
import { Tooltip } from '@/components/mdx';

export default function MainFeatures() {
  return (
    <div
      className={clsx(
        'mx-auto w-full max-w-7xl gap-8 px-4 sm:gap-20 sm:px-12',
        'grid grid-cols-1 md:grid-cols-2'
      )}>
      <MainFeatureColumn
        icon={faServer}
        title='Dedicated Game Server Hosting'
        description={<>Includes low-latency DDoS mitigation. Autoscaling & <Tooltip tip='Boot servers on-demand in less than 5 seconds'>instant servers</Tooltip>. Monitoring & crash reporting. Supports TCP, UDP, WebSockets, & <Tooltip tip='WebRTC, ENet, KPC'>more</Tooltip>.</>}
        buttons={[
          { name: 'Documentation', href: '/docs/dynamic-servers' }
        ]}
      />
      <MainFeatureColumn
        icon={faChessKnight}
        title='Matchmaking, Lobbies, & Parties'
        description='Supports casual, competitive, MMO, and turn-based. Supports server-authoritative, P2P, and async multiplayer. Works with existing multiplayer.'
        buttons={[{ name: 'Documentation', href: '/docs/matchmaker' }]}
      />
      <MainFeatureColumn
        icon={faUser}
        title='Accounts, Friends, & Presence'
        description='Email, username, and OAuth support. Support social logins including Google, Twitch, Discord, and more. Display friends online & join lobbies.'
        buttons={[
          { name: 'Documentation', href: 'https://opengb.dev/modules/auth/overview', target: '_blank' }
        ]}
      />
      <MainFeatureColumn
        icon={faPuzzle}
        title='100% Modular & Scriptable'
        description={<>Pick and choose modules to use. Easily write server-side scripts & real-time actors. <Tooltip tip='Powered by Postgres'>Database</Tooltip> included for free. Powered by <a href='https://opengb.dev' target='_blank' rel='noreferrer' className='text-orange-400 hover:text-orange-300'>Open Game Backend</a>.</>}
        buttons={[{ name: 'Documentation', href: 'https://opengb.dev', target: '_blank' }]}
      />
    </div>
  );
}

function MainFeatureColumn({ icon, title, description, buttons }) {
  return (
    <div className={clsx('relative', 'h-full text-left', 'flex flex-col', 'col-span-1')}>
      <div className="flex items-start space-x-4 h-full">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-orange-400/10">
            <FontAwesomeIcon icon={icon} className="h-8 w-8 text-orange-400" />
          </div>
        </div>
        <div className="flex-grow flex flex-col h-full">
          <h2 className='font-display text-2xl font-semibold text-cream-100'>{title}</h2>
          <div className='mt-2 max-w-2xl'>
            <p className='text-sm font-semibold text-cream-100/90'>{description}</p>
          </div>
          <div className='flex-grow min-h-2'></div>
          <div className='flex flex-col gap-2'>
            {buttons.map((button, i) => (
              <a
                key={i}
                href={button.href}
                target={button.target}
                rel='noreferrer'
                className={clsx(
                  'justify-left flex items-center gap-1 text-xs font-bold text-orange-400 hover:text-orange-300 sm:text-sm',
                  button.classes
                )}>
                {button.name}
                <FontAwesomeIcon icon={faArrowRight} className='h-6 w-6' />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}