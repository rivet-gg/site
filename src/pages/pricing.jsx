import { useState } from 'react';
import { Dialog, RadioGroup } from '@headlessui/react';
import { Bars3Icon, XMarkIcon as XMarkIconOutline } from '@heroicons/react/24/outline';
import { CheckIcon, XMarkIcon as XMarkIconMini } from '@heroicons/react/20/solid';
import clsx from 'clsx';

const pricing = {
  frequencies: [
    { value: 'monthly', label: 'Monthly' },
    { value: 'annually', label: 'Annually' }
  ],
  tiers: [
    {
      name: 'Open Source',
      id: 'tier-starter',
      buttonName: 'View on GitHub',
      href: 'https://github.com/rivet-gg/rivet',
      featured: false,
      description: 'All your essential business finances, taken care of.',
      mainFeatures: [
        'Permissive license (Apache 2.0)',
        'Self-host on your hardware',
        'Read & modify source code'
      ]
    },
    {
      name: 'Cloud',
      id: 'tier-scale',
      buttonName: 'Sign Up',
      href: '#',
      featured: true,
      description: 'The best financial services for your thriving business.',
      mainFeatures: [
        'Auto-scaling game servers',
        'DDoS mitigation',
        'Flexible matchmaking',
        'Streamlined team collaboration',
        'No downtime deploys',
        'CDN for hosting assets & webpages'
      ]
    },
    {
      name: 'Enterprise',
      id: 'tier-growth',
      buttonName: 'Contact Us',
      href: '#',
      featured: false,
      description: 'Convenient features to take your business to the next level.',
      mainFeatures: ['Host on-premise', 'SLA', 'Support']
    }
  ],
  sections: [
    {
      name: 'Cluster',
      features: [
        { name: 'Tax Savings', tiers: [0, 1, 0] },
        { name: 'Tax Savings', tiers: [0, 1, 0] },
        { name: 'Tax Savings', tiers: [0, 1, 0] },
        { name: 'Tax Savings', tiers: [0, 1, 0] }
      ]
    },
    {
      name: 'Other perks',
      features: [
        { name: 'Tax Savings', tiers: [0, 1, 0] },
        { name: 'Tax Savings', tiers: [0, 1, 0] },
        { name: 'Tax Savings', tiers: [0, 1, 0] }
      ]
    }
  ]
};

export default function Pricing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);

  return (
    <>
      {/* Pricing section */}
      <div className='isolate overflow-hidden'>
        <div className='flow-root bg-gray-900 py-16 sm:pt-32 lg:pb-0'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='relative z-10'>
              <h1 className='mx-auto max-w-4xl text-center text-5xl font-bold tracking-tight text-white'>
                Pricing
              </h1>
            </div>
            <div className='relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:-mb-14 lg:max-w-none lg:grid-cols-3'>
              {/* Outline */}
              <svg
                viewBox='0 0 1208 1024'
                aria-hidden='true'
                className='absolute -bottom-48 left-1/2 h-[64rem] -translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:-top-48 lg:bottom-auto lg:translate-y-0'>
                <ellipse
                  cx={604}
                  cy={512}
                  fill='url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)'
                  rx={604}
                  ry={512}
                />
                <defs>
                  <radialGradient id='d25c25d4-6d43-4bf9-b9ac-1842a30a4867'>
                    <stop stopColor='#7775D6' />
                    <stop offset={1} stopColor='#E935C1' />
                  </radialGradient>
                </defs>
              </svg>
              <div
                className='hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:bg-gray-800/80 lg:ring-1 lg:ring-white/10'
                aria-hidden='true'
              />

              {/* Tiers */}
              {pricing.tiers.map(tier => (
                <div
                  key={tier.id}
                  className={clsx(
                    tier.featured
                      ? 'z-10 bg-white shadow-xl ring-1 ring-gray-900/10'
                      : 'bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0',
                    'relative rounded-2xl'
                  )}>
                  <div className='p-8 lg:pt-12 xl:p-10 xl:pt-14'>
                    <h2
                      id={tier.id}
                      className={clsx(
                        tier.featured ? 'text-gray-900' : 'text-white',
                        'text-4xl font-bold leading-6'
                      )}>
                      {tier.name}
                    </h2>
                    <div className='mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch'>
                      <a
                        href={tier.href}
                        aria-describedby={tier.id}
                        className={clsx(
                          tier.featured
                            ? 'bg-indigo-600 shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600'
                            : 'bg-white/10 hover:bg-white/20 focus-visible:outline-white',
                          'rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                        )}>
                        {tier.buttonName}
                      </a>
                    </div>
                    <div className='mt-8 flow-root sm:mt-10'>
                      <ul
                        role='list'
                        className={clsx(
                          tier.featured
                            ? 'divide-gray-900/5 border-gray-900/5 text-gray-600'
                            : 'divide-white/5 border-white/5 text-white',
                          '-my-2 divide-y border-t text-sm leading-6 lg:border-t-0'
                        )}>
                        {tier.mainFeatures.map(mainFeature => (
                          <li key={mainFeature} className='flex gap-x-3 py-2'>
                            <CheckIcon
                              className={clsx(
                                tier.featured ? 'text-indigo-600' : 'text-gray-500',
                                'h-6 w-5 flex-none'
                              )}
                              aria-hidden='true'
                            />
                            {mainFeature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature comparison */}
        <div className='relative bg-gray-50 lg:pt-14'>
          <div className='mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8'>
            <FeatureComparisonSmall />
            <FeatureComparisonLarge />
          </div>
        </div>
      </div>
    </>
  );
}

function FeatureComparisonSmall() {
  return (
    <section aria-labelledby='mobile-comparison-heading' className='lg:hidden'>
      <h2 id='mobile-comparison-heading' className='sr-only'>
        Feature comparison
      </h2>

      <div className='mx-auto max-w-2xl space-y-16'>
        {pricing.tiers.map((tier, tierIdx) => (
          <div key={tier.id} className='border-t border-gray-900/10'>
            <div
              className={clsx(
                tier.featured ? 'border-indigo-600' : 'border-transparent',
                '-mt-px w-72 border-t-2 pt-10 md:w-80'
              )}>
              <h3
                className={clsx(
                  tier.featured ? 'text-indigo-600' : 'text-gray-900',
                  'text-sm font-semibold leading-6'
                )}>
                {tier.name}
              </h3>
              <p className='mt-1 text-sm leading-6 text-gray-600'>{tier.description}</p>
            </div>

            <div className='mt-10 space-y-10'>
              {pricing.sections.map((section, i) => {
                return (
                  <div key={section.name}>
                    <h4 className='text-sm font-semibold leading-6 text-gray-900'>{section.name}</h4>
                    <div className='relative mt-6'>
                      {/* Fake card background */}
                      <div
                        aria-hidden='true'
                        className='absolute inset-y-0 right-0 hidden w-1/2 rounded-lg bg-white shadow-sm sm:block'
                      />

                      <div
                        className={clsx(
                          tier.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-900/10',
                          'relative rounded-lg bg-white shadow-sm sm:rounded-none sm:bg-transparent sm:shadow-none sm:ring-0'
                        )}>
                        <dl className='divide-y divide-gray-200 text-sm leading-6'>
                          {section.features.map(feature => {
                            let featureTier = feature.tiers[tierIdx];
                            return (
                              <div
                                key={feature.name}
                                className='flex items-center justify-between px-4 py-3 sm:grid sm:grid-cols-2 sm:px-0'>
                                <dt className='pr-4 text-gray-600'>{feature.name}</dt>
                                <dd className='flex items-center justify-end sm:justify-center sm:px-4'>
                                  {typeof featureTier === 'string' ? (
                                    <span
                                      className={
                                        tier.featured ? 'font-semibold text-indigo-600' : 'text-gray-900'
                                      }>
                                      {featureTier}
                                    </span>
                                  ) : (
                                    <>
                                      {featureTier === 1 ? (
                                        <CheckIcon
                                          className='mx-auto h-5 w-5 text-indigo-600'
                                          aria-hidden='true'
                                        />
                                      ) : (
                                        <XMarkIconMini
                                          className='mx-auto h-5 w-5 text-gray-400'
                                          aria-hidden='true'
                                        />
                                      )}

                                      <span className='sr-only'>{featureTier === true ? 'Yes' : 'No'}</span>
                                    </>
                                  )}
                                </dd>
                              </div>
                            );
                          })}
                        </dl>
                      </div>

                      {/* Fake card border */}
                      <div
                        aria-hidden='true'
                        className={clsx(
                          tier.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-900/10',
                          'pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 rounded-lg sm:block'
                        )}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureComparisonLarge() {
  return (
    <section aria-labelledby='comparison-heading' className='hidden lg:block'>
      <h2 id='comparison-heading' className='sr-only'>
        Feature comparison
      </h2>

      <div className='grid grid-cols-4 gap-x-8 border-t border-gray-900/10 before:block'>
        {pricing.tiers.map(tier => (
          <div key={tier.id} aria-hidden='true' className='-mt-px'>
            <div
              className={clsx(
                tier.featured ? 'border-indigo-600' : 'border-transparent',
                'border-t-2 pt-10'
              )}>
              <p
                className={clsx(
                  tier.featured ? 'text-indigo-600' : 'text-gray-900',
                  'text-sm font-semibold leading-6'
                )}>
                {tier.name}
              </p>
              <p className='mt-1 text-sm leading-6 text-gray-600'>{tier.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='-mt-6 space-y-16'>
        {pricing.sections.map(section => (
          <div key={section.name}>
            <h3 className='text-sm font-semibold leading-6 text-gray-900'>{section.name}</h3>
            <div className='relative -mx-8 mt-10'>
              {/* Fake card backgrounds */}
              <div
                className='absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block'
                aria-hidden='true'>
                <div className='h-full w-full rounded-lg bg-white shadow-sm' />
                <div className='h-full w-full rounded-lg bg-white shadow-sm' />
                <div className='h-full w-full rounded-lg bg-white shadow-sm' />
              </div>

              <table className='relative w-full border-separate border-spacing-x-8'>
                <thead>
                  <tr className='text-left'>
                    <th scope='col'>
                      <span className='sr-only'>Feature</span>
                    </th>
                    {pricing.tiers.map(tier => (
                      <th key={tier.id} scope='col'>
                        <span className='sr-only'>{tier.name} tier</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.features.map((feature, featureIdx) => (
                    <tr key={feature.name}>
                      <th
                        scope='row'
                        className='w-1/4 py-3 pr-4 text-left text-sm font-normal leading-6 text-gray-900'>
                        {feature.name}
                        {featureIdx !== section.features.length - 1 ? (
                          <div className='absolute inset-x-8 mt-3 h-px bg-gray-200' />
                        ) : null}
                      </th>
                      {pricing.tiers.map((tier, tierIdx) => {
                        let featureTier = feature.tiers[tierIdx];
                        return (
                          <td key={tier.id} className='relative w-1/4 px-4 py-0 text-center'>
                            <span className='relative h-full w-full py-3'>
                              {typeof featureTier === 'string' ? (
                                <span
                                  className={clsx(
                                    tier.featured ? 'font-semibold text-indigo-600' : 'text-gray-900',
                                    'text-sm leading-6'
                                  )}>
                                  {featureTier}
                                </span>
                              ) : (
                                <>
                                  {featureTier === 1 ? (
                                    <CheckIcon
                                      className='mx-auto h-5 w-5 text-indigo-600'
                                      aria-hidden='true'
                                    />
                                  ) : (
                                    <XMarkIconMini
                                      className='mx-auto h-5 w-5 text-gray-400'
                                      aria-hidden='true'
                                    />
                                  )}

                                  <span className='sr-only'>
                                    {featureTier === true ? 'Yes' : 'No'}
                                  </span>
                                </>
                              )}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Fake card borders */}
              <div
                className='pointer-events-none absolute inset-x-8 inset-y-0 grid grid-cols-4 gap-x-8 before:block'
                aria-hidden='true'>
                {pricing.tiers.map(tier => (
                  <div
                    key={tier.id}
                    className={clsx(
                      tier.featured ? 'ring-2 ring-indigo-600' : 'ring-1 ring-gray-900/10',
                      'rounded-lg'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Pricing.prose = false;
