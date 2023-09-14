import Image from 'next/image';
import clsx from 'clsx';
import { Button } from '@/components/Button';
import { CheckIcon, MinusIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import imgIdentity from '@/images/products/identity-duotone.svg';
import imgCompute from '@/images/products/compute-duotone.svg';
import imgCdn from '@/images/products/cdn-duotone.svg';
import imgParties from '@/images/products/party-duotone.svg';
import imgFriend from '@/images/products/friend-duotone.svg';
import imgKv from '@/images/products/kv-duotone.svg';
import imgMatchmaker from '@/images/products/matchmaker-duotone.svg';
import imgGameGuard from '@/images/products/game-guard-duotone.svg';
import imgAnalytics from '@/images/products/analytics-duotone.svg';
import { faInfinity } from '@fortawesome/pro-solid-svg-icons';

// Target on-demand price: ~$22/mo
// Hathora runs c6a.2xlarge, ~$27.54
const ON_DEMAND_PRICE = 2200;
// For reference, AWS saving over on-demand: ~37%
// Our savings over on demand: 30%
// This factors in the amount of compute we assume clients will not use
const RESERVED_SAVINGS = 0.3;
// Our margin: 66%
const MARGIN = 0.45;
const MARKUP = 1 / (1 - MARGIN);
// What % of the unused compute we can auto-scale: 40%
// 100% means we never have unused compute
const AUTOSCALING_FACTOR = 0.4;
// const PRICE_PER_CORE = ON_DEMAND_PRICE * (1 - RESERVED_SAVINGS) * (1 - RESERVED_SAVINGS * AUTOSCALING_FACTOR) * MARKUP;
const PRICE_PER_CORE = 2600;

let UNIT_CORE = {
  ram: 2000,
  bandwidth: 1000
};

let TIERS = [
  { name: '¹⁄₁₆', unit: 1 / 16 },
  { name: '⅛', unit: 1 / 8 },
  { name: '¼', unit: 1 / 4 },
  { name: '½', unit: 1 / 2 },
  { name: '1', unit: 1 },
  { name: '2', unit: 2 },
  { name: '4', unit: 4 }
];

export default function Pricing() {
  const [open, setOpen] = useState(false);

  const tiers = [
    {
      name: 'Open Source',
      id: 'tier-oss',
      href: 'https://github.com/rivet-gg/rivet',
      button: 'View on GitHub',
      description: 'Self-host on your own hardware.',
      mostPopular: false
    },
    {
      name: 'Cloud',
      promo: '1 free server',
      id: 'tier-cloud',
      href: 'https://b8v8449klvp.typeform.com/rivet',
      button: 'Sign Up',
      description: 'Get up and running quickly. Everything managed by us.',
      mostPopular: true
    },
    {
      name: 'Enterprise',
      id: 'tier-enterprise',
      href: 'mailto:sales@rivet.gg',
      button: 'Contact Us',
      description: 'Custom solutions for your game.',
      mostPopular: false
    }
  ];
  const sections = [
    {
      name: 'Pricing',
      features: [
        {
          name: 'CCU & MAU',
          icon: imgIdentity,
          tiers: {
            'tier-oss': <FontAwesomeIcon icon={faInfinity} />,
            'tier-cloud': <FontAwesomeIcon icon={faInfinity} />,
            'tier-enterprise': <FontAwesomeIcon icon={faInfinity} />
          }
        },
        {
          name: 'Dynamic Servers',
          icon: imgCompute,
          tiers: {
            'tier-oss': 'Self-hosted',
            'tier-cloud': (
              <Button variant='text' arrow='right' onClick={() => setOpen(true)}>
                Calculator
              </Button>
            ),
            'tier-enterprise': 'Contact Us'
          }
        },
        {
          name: 'Custom Domain with SSL',
          icon: imgCdn,
          tiers: {
            'tier-oss': 'Self-hosted',
            'tier-cloud': '$5/domain/month',
            'tier-enterprise': 'Contact Us'
          }
        },
        {
          name: 'CDN',
          icon: imgCdn,
          tiers: {
            'tier-oss': 'Self-hosted',
            'tier-cloud': '$0.05/GB/month (1 TB free)',
            'tier-enterprise': 'Contact Us'
          }
        }
      ]
    },
    {
      name: 'Features',
      features: [
        // {
        //   name: 'Identities, Chat, & Groups',
        //   icon: imgFriend,
        //   tiers: { 'tier-oss': true, 'tier-cloud': true, 'tier-enterprise': true }
        // },
        // {
        //   name: 'Parties',
        //   icon: imgParties,
        //   tiers: { 'tier-oss': true, 'tier-cloud': true, 'tier-enterprise': true }
        // },
        {
          name: 'Dynamic Server Autoscaling',
          icon: imgCompute,
          tiers: { 'tier-oss': true, 'tier-cloud': true, 'tier-enterprise': true }
        },
        {
          name: 'Matchmaker',
          icon: imgMatchmaker,
          tiers: { 'tier-oss': true, 'tier-cloud': true, 'tier-enterprise': true }
        },
        {
          name: 'Key-Value Database',
          icon: imgKv,
          tiers: { 'tier-oss': true, 'tier-cloud': 'Free while in beta', 'tier-enterprise': 'Contact us' }
        },
        {
          name: 'Game Guard (DDoS + SSL)',
          icon: imgGameGuard,
          tiers: { 'tier-oss': 'Limited', 'tier-cloud': true, 'tier-enterprise': true }
        },
        {
          name: 'Analytics',

          icon: imgAnalytics,
          tiers: { 'tier-cloud': true, 'tier-enterprise': true }
        },
        { name: 'Audit Log', tiers: { 'tier-enterprise': true } },
        { name: 'Single Sign-On (SAML 2.0)', tiers: { 'tier-enterprise': true } }
      ]
    },
    {
      name: 'Game servers',
      features: [
        { name: 'Dedicated Hardware Autoscaling', tiers: { 'tier-cloud': true, 'tier-enterprise': true } },
        {
          name: 'Cloud Providers (more coming soon)',
          tiers: {
            'tier-oss': 'Linode',
            'tier-cloud': 'Linode',
            'tier-enterprise': 'On-premise, AWS, Linode'
          }
        },
        { name: 'Bring Your Own Hardware', tiers: { 'tier-enterprise': true } }
      ]
    },
    {
      name: 'Cluster',
      features: [
        { name: 'On-Premise Deployment', tiers: { 'tier-oss': true, 'tier-enterprise': true } },
        { name: 'High Availability', tiers: { 'tier-cloud': true, 'tier-enterprise': true } },
        { name: 'Horizontal Scaling', tiers: { 'tier-cloud': true, 'tier-enterprise': true } }
      ]
    },
    {
      name: 'Support',
      features: [
        {
          name: 'Support',
          tiers: { 'tier-oss': 'Community', 'tier-cloud': 'Standard', 'tier-enterprise': 'Contact Us' }
        }
      ]
    }
  ];
  return (
    <div className='py-16 sm:py-24'>
      {/* Modals */}
      <PricingModal open={open} onClose={() => setOpen(false)} />

      {/* Pricing */}
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <p className='mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl'>
            Pricing
          </p>
        </div>
        <p className='mx-auto mt-6 text-center text-lg leading-8 text-gray-300'>
          Affordable for small studios & scalable for large studios.
          <br />
          Always predictable pricing.
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
              <h2 className='mt-2 flex items-baseline gap-x-1 text-4xl font-bold text-white'>{tier.name}</h2>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={clsx(
                  tier.mostPopular
                    ? 'bg-violet-500 text-white hover:bg-violet-400 focus-visible:outline-violet-500'
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
                            <CheckIcon className='h-6 w-5 flex-none text-violet-400' aria-hidden='true' />
                            <span>
                              {feature.name}{' '}
                              {typeof feature.tiers[tier.id] === 'string' ||
                              typeof feature.tiers[tier.id] === 'object' ? (
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
                    <th key={tier.id} scope='col' className='px-6 pt-6 align-top xl:px-8 xl:pt-8'>
                      <h2 className='font-bolt text-4xl text-white'>{tier.name}</h2>
                      <p className='mt-3 font-normal text-gray-300'>{tier.description}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'></th>
                  {tiers.map(tier => (
                    <td key={tier.id} className='px-6 pt-6 xl:px-8'>
                      <a
                        href={tier.href}
                        className={clsx(
                          tier.mostPopular
                            ? 'bg-violet-500 hover:bg-violet-400 focus-visible:outline-violet-600'
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
                          <div className='flex items-center gap-3'>
                            {feature.icon && (
                              <Image className='h-5 w-5' src={feature.icon} alt={section.name} />
                            )}
                            <div>{feature.name}</div>
                          </div>
                          {/* <div className='absolute inset-x-8 mt-4 h-px bg-white/5' /> */}
                        </th>
                        {tiers.map(tier => (
                          <td key={tier.id} className='px-6 py-4 xl:px-8'>
                            {typeof feature.tiers[tier.id] === 'string' ||
                            typeof feature.tiers[tier.id] === 'object' ? (
                              <div className='text-center text-sm leading-6 text-gray-300'>
                                {feature.tiers[tier.id]}
                              </div>
                            ) : (
                              <>
                                {feature.tiers[tier.id] === true ? (
                                  <CheckIcon className='mx-auto h-5 w-5 text-violet-400' aria-hidden='true' />
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

function PricingModal({ open, onClose }) {
  return (
    <Transition.Root show={open} onClose={onClose} as={Fragment}>
      <Dialog as='div' className='relative z-10'>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='relative transform overflow-hidden rounded-xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                {/* Content */}
                <div className='mt-1 text-center'>
                  <Dialog.Title as='h3' className='text-4xl font-bold text-gray-900'>
                    Dynamic Servers Pricing
                  </Dialog.Title>

                  <div className='m-auto mt-6 h-[2px] w-full bg-black/10'></div>

                  <div className='mt-6'>
                    <PricingCalc />
                  </div>
                </div>

                {/* Buttons */}
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600'
                    onClick={onClose}>
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function PricingCalc() {
  let [tierIdx, setTierIdx] = useState(4);

  let tier = TIERS[tierIdx];

  let price = Math.ceil(PRICE_PER_CORE * tier.unit) / 100;

  let ram = Math.floor(UNIT_CORE.ram * tier.unit);
  let bandwidth = Math.floor(UNIT_CORE.bandwidth * tier.unit);
  let stats = [
    ['CPU Cores', `${tier.name} core`],
    ['RAM', `${ram} MB`],
    ['Bandwidth', `${bandwidth} GB`],
    ['Hardware', 'AMD EPYC 7713 64-Core Processor'],
    ['Clock Speed', '2.0 GHz base, 3.675 GHz boost']
  ];

  return (
    <div>
      <PricingTabs tierIdx={tierIdx} setTierIdx={setTierIdx} />

      {/* Price */}
      <div className='mt-6 flex items-end justify-center'>
        <div className='text-5xl font-bold'>${price.toFixed(2)}</div>
        <div className='text-xl text-black/50'>/server/mo</div>
      </div>

      {/* Specs */}
      <table className='mx-auto mt-5 w-full max-w-sm border-separate border-spacing-1'>
        {stats.map(([name, value]) => (
          <tr key={name}>
            <td className='text-left font-semibold'>{name}</td>
            <td className='text-right'>{value}</td>
          </tr>
        ))}
      </table>

      <div className='relative mx-auto mt-4 flex w-max items-center rounded-full px-3 py-1 text-sm leading-6 text-gray-900 ring-1 ring-black/50'>
        More hardware configurations coming soon
      </div>

      {/* Disclaimers */}
      <div className='mt-4 italic text-black/60'>
        Bandwidth pooled across all lobbies.
        <br />
        For example: 5 × 1-core lobbies = 5 TB total free bandwidth.
        <br />
        $0.05/GB for bandwidth overages.
      </div>
    </div>
  );
}

function PricingTabs({ tierIdx, setTierIdx }) {
  return (
    <div>
      <div className='font-lg font-bold'>Number of CPU cores per server</div>
      <div className='isolate mt-2 flex flex w-full rounded-md shadow-sm'>
        {TIERS.map((tier, i) => {
          let current = i == tierIdx;
          return (
            <div
              key={i}
              className={clsx(
                'inline-flex flex-grow cursor-pointer items-center justify-center',
                current
                  ? 'z-10 bg-violet-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600'
                  : 'px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              )}
              onClick={() => setTierIdx(i)}>
              {tier.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Pricing.prose = false;
