import { Fragment } from 'react';
import { CheckIcon, MinusIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';

// const pricing = {
//   frequencies: [
//     { value: 'monthly', label: 'Monthly' },
//     { value: 'annually', label: 'Annually' }
//   ],
//   tiers: [
//     {
//       name: 'Open Source',
//       id: 'tier-starter',
//       buttonName: 'View on GitHub',
//       href: 'https://github.com/rivet-gg/rivet',
//       featured: false,
//       description: 'All your essential business finances, taken care of.',
//       mainFeatures: [
//         'Self-host on your hardware',
//         'Read & modify source code',
//         'Permissive license (Apache 2.0)',
//       ]
//     },
//     {
//       name: 'Cloud',
//       id: 'tier-scale',
//       buttonName: 'Sign Up',
//       href: '#',
//       featured: true,
//       description: 'The best financial services for your thriving business.',
//       mainFeatures: [
//         'Auto-scaling game servers',
//         'DDoS mitigation',
//         'Flexible matchmaking',
//         'Streamlined team collaboration',
//         'No downtime deploys',
//         'CDN for hosting assets & webpages'
//       ]
//     },
//     {
//       name: 'Enterprise',
//       id: 'tier-growth',
//       buttonName: 'Contact Us',
//       href: '#',
//       featured: false,
//       description: 'Convenient features to take your business to the next level.',
//       mainFeatures: ['Host on-premise', 'SLA', 'Support']
//     }
//   ],
//   sections: [
//     {
//       name: 'Services',
//       features: [
//         { name: 'Analytics', tiers: [0, 1, 1] },
//         { name: 'Audit log', tiers: [0, 0, 1] },
//         { name: 'SSO', tiers: [0, 0, 1] },
//         {
//           name: 'Cloud providers (more coming soon)',
//           tiers: ['Linode', 'Linode', 'On-premise, AWS, Linode']
//         },
//         { name: 'Bring-your-own-server', tiers: ['Coming soon', 'Coming soon', 1] }
//       ]
//     },
//     {
//       name: 'Cluster',
//       features: [
//         { name: 'On-premise deployment', tiers: [1, 0, 1] },
//         { name: 'Autoscaling (cost saving)', tiers: [0, 1, 1] },
//         { name: 'High availability', tiers: [0, 1, 1] },
//         { name: 'Horzontal scaling', tiers: [0, 1, 1] }
//       ]
//     },
//     {
//       name: 'Support',
//       features: [
//         { name: 'Support', tiers: ['Community', 'Standard', 'Business or Enterprise'] },
//         { name: 'Onboarding', tiers: ['Community', 'Community', 1] }
//       ]
//     }
//   ]
// };

const tiers = [
  {
    name: 'Open Source',
    id: 'tier-oss',
    href: '#',
    button: 'View on GitHub',
    description: 'Self-host on your own hardware.',
    mostPopular: false
  },
  {
    name: 'Cloud',
    id: 'tier-cloud',
    href: '#',
    button: 'Sign Up',
    description: 'Get up and running quickly. Everything managed by us.',
    mostPopular: true
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    button: 'Contact Us',
    description: 'Custom solutions for your game.',
    mostPopular: false
  }
];
const sections = [
  {
    name: 'Features',
    features: [
      { name: 'Analytics', tiers: { 'tier-cloud': true, 'tier-enterprise': true } },
      { name: 'Audit log', tiers: { 'tier-enterprise': true } },
      { name: 'SSO', tiers: { 'tier-enterprise': true } },
      { name: 'Cloud providers (more coming soon)', tiers: { 'tier-oss': 'Linode', 'tier-cloud': 'Linode', 'tier-enterprise': 'On-premise, AWS, Linode' } },
      { name: 'Bring your own game server', tiers: {  'tier-cloud': 'Coming soon', 'tier-enterprise': true } },
    ]
  },
  {
    name: 'Cluster',
    features: [
      { name: 'On-premise deployment', tiers: { 'tier-oss': true, 'tier-enterprise': true } },
      { name: 'Autoscaling (cost saving)', tiers: { 'tier-cloud': true, 'tier-enterprise': true } },
      { name: 'High availability', tiers: { 'tier-cloud': true,'tier-enterprise': true } },
      { name: 'Horizontal scaling', tiers: { 'tier-cloud': true, 'tier-enterprise': true } }
    ]
  },
  {
    name: 'Support',
    features: [
      { name: 'Onboarding', tiers: { 'tier-oss': 'Community', 'tier-cloud': 'Community', 'tier-enterprise': true } },
      { name: 'Support', tiers: { 'tier-oss': 'Community', 'tier-cloud': 'Standard', 'tier-enterprise': 'Custom' } }
    ]
  }
];

export default function Pricing() {
  return (
    <div className='py-16 sm:py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h1 className='text-base font-semibold leading-7 text-indigo-400'>Pricing</h1>
          <p className='mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl'>
            Plans for teams of&nbsp;all&nbsp;sizes
          </p>
        </div>
        <p className='mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300'>
          Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non
          voluptas in. Explicabo id ut laborum.
        </p>

        {/* xs to lg */}
        <div className='mx-auto mt-12 max-w-md space-y-8 sm:mt-16 lg:hidden'>
          {tiers.map(tier => (
            <section
              key={tier.id}
              className={clsx(
                tier.mostPopular ? 'rounded-xl bg-white/5 ring-1 ring-inset ring-white/10' : '',
                'p-8'
              )}>
              <h2 className='mt-2 flex items-baseline gap-x-1 text-4xl font-bold text-white'>
                {tier.name}
              </h2>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={clsx(
                  tier.mostPopular
                    ? 'bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-indigo-500'
                    : 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white',
                  'mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                )}>
                {tier.button}
              </a>
              <ul role='list' className='mt-10 space-y-4 text-sm leading-6 text-white'>
                {sections.map(section => (
                  <li key={section.name}>
                    <ul role='list' className='space-y-4'>
                      {section.features.map(feature =>
                        feature.tiers[tier.id] ? (
                          <li key={feature.name} className='flex gap-x-3'>
                            <CheckIcon className='h-6 w-5 flex-none text-indigo-400' aria-hidden='true' />
                            <span>
                              {feature.name}{' '}
                              {typeof feature.tiers[tier.id] === 'string' ? (
                                <span className='text-sm leading-6 text-gray-400'>
                                  ({feature.tiers[tier.id]})
                                </span>
                              ) : null}
                            </span>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* lg+ */}
        <div className='isolate mt-20 hidden lg:block'>
          <div className='relative -mx-8'>
            {tiers.some(tier => tier.mostPopular) ? (
              <div className='absolute inset-x-4 inset-y-0 -z-10 flex'>
                <div
                  className='flex w-1/4 px-4'
                  aria-hidden='true'
                  style={{ marginLeft: `${(tiers.findIndex(tier => tier.mostPopular) + 1) * 25}%` }}>
                  <div className='w-full rounded-t-xl border-x border-t border-white/10 bg-white/5' />
                </div>
              </div>
            ) : null}
            <table className='w-full table-fixed border-separate border-spacing-x-8 text-left'>
              <caption className='sr-only'>Pricing plan comparison</caption>
              <colgroup>
                <col className='w-1/4' />
                <col className='w-1/4' />
                <col className='w-1/4' />
                <col className='w-1/4' />
              </colgroup>
              <thead>
                <tr>
                  <td />
                  {tiers.map(tier => (
                    <th key={tier.id} scope='col' className='px-6 pt-6 xl:px-8 xl:pt-8'>
                      <h2 className='text-4xl font-bolt text-white'>{tier.name}</h2>
                      <p className='text-gray-300 font-normal mt-3'>{tier.description}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>
                    <span className='sr-only'>Price</span>
                  </th>
                  {tiers.map(tier => (
                    <td key={tier.id} className='px-6 pt-8 xl:px-8'>
                      <a
                        href={tier.href}
                        className={clsx(
                          tier.mostPopular
                            ? 'bg-indigo-500 hover:bg-indigo-400 focus-visible:outline-indigo-600'
                            : 'bg-white/10 hover:bg-white/20 focus-visible:outline-white',
                          'block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                        )}>
                        {tier.button}
                      </a>
                    </td>
                  ))}
                </tr>
                {sections.map((section, sectionIdx) => (
                  <Fragment key={section.name}>
                    <tr>
                      <th
                        scope='colgroup'
                        colSpan={4}
                        className={clsx(
                          sectionIdx === 0 ? 'pt-8' : 'pt-16',
                          'pb-4 text-sm font-semibold leading-6 text-white'
                        )}>
                        {section.name}
                        <div className='absolute inset-x-8 mt-4 h-px bg-white/10' />
                      </th>
                    </tr>
                    {section.features.map(feature => (
                      <tr key={feature.name}>
                        <th scope='row' className='py-4 text-sm font-normal leading-6 text-white'>
                          {feature.name}
                          <div className='absolute inset-x-8 mt-4 h-px bg-white/5' />
                        </th>
                        {tiers.map(tier => (
                          <td key={tier.id} className='px-6 py-4 xl:px-8'>
                            {typeof feature.tiers[tier.id] === 'string' ? (
                              <div className='text-center text-sm leading-6 text-gray-300'>
                                {feature.tiers[tier.id]}
                              </div>
                            ) : (
                              <>
                                {feature.tiers[tier.id] === true ? (
                                  <CheckIcon className='mx-auto h-5 w-5 text-indigo-400' aria-hidden='true' />
                                ) : (
                                  <MinusIcon className='mx-auto h-5 w-5 text-gray-500' aria-hidden='true' />
                                )}

                                <span className='sr-only'>
                                  {feature.tiers[tier.id] === true ? 'Included' : 'Not included'} in{' '}
                                  {tier.name}
                                </span>
                              </>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

Pricing.prose = false;
