'use client';
import { Button } from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBellConcierge, faHammer, faPlus } from '@fortawesome/sharp-solid-svg-icons';
import clsx from 'clsx';
import { LayoutGroup, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import OpenGBMeta from '../../../vendor/opengb-meta.json';
import { ModuleCard } from '@/components/ModuleCard';
import { Card } from '@/components/Card';

export default function ModulesPage() {
  const [query, setQuery] = useState('');

  const categories = OpenGBMeta.categories
    .map(category => {
      const modules = category.modules.filter(
        module =>
          module.name.toLowerCase().includes((query || '').toLowerCase()) ||
          module.description.toLowerCase().includes((query || '').toLowerCase())
      );
      return { ...category, modules };
    })
    .filter(category => category.modules.length > 0);

  return (
    <>
      <section className='my-8 flex flex-col gap-4 text-white'>
        <h1 className='text-center text-5xl'>Backend Modules Store</h1>
        <p className='text-center text-white/80'>Build your game&apos;s backend with open-source modules.</p>

        <div className='mx-auto flex w-full max-w-lg items-center border border-transparent border-b-cream-100 px-2 transition-colors focus-within:border-cream-100'>
          <FontAwesomeIcon icon='magnifying-glass' className='size-4 text-white/80' />
          <input
            value={query}
            onChange={e => {
              setQuery(e.target.value);
            }}
            className='w-full appearance-none border-transparent bg-transparent text-white/80 outline-none placeholder:text-white/80 focus:border-transparent focus:ring-0'
            placeholder='Search...'
          />
        </div>
      </section>
      <div className='flex flex-row gap-8'>
        <div className='flex flex-shrink-0 flex-row'>
          <div className='flex max-w-sm flex-col gap-3'>
            {OpenGBMeta.categories.map(category => (
              <Link
                key={category.slug}
                href={`#${category.slug}`}
                className={clsx(
                  'data-active:text-foreground data-active:font-semibold text-white/80 transition-opacity',
                  categories.find(c => c.slug === category.slug) ? '' : 'opacity-50'
                )}
              >
                {category.name}
              </Link>
            ))}

            <Button variant='secondary' href='/build' icon={faPlus}>
              Publish Your Module
            </Button>
          </div>
        </div>
        <div className='w-full'>
          <LayoutGroup>
            {categories.length === 0 ? (
              <motion.div
                className='w-full lg:w-1/2'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Card>
                  <div className='text-left'>
                    <div>
                      <FontAwesomeIcon icon='sad-tear' className='mr-2 text-2xl' />
                      No modules found
                    </div>
                  </div>
                  <div className='text-white/80'>
                    If you can&apos;t find a module that fits your needs, you can request a module to be
                    created or build your own module.
                  </div>
                  <div className='mt-2 flex gap-2'>
                    <Button
                      href='https://b8v8449klvp.typeform.com/to/kpcSBpuP'
                      target='_blank'
                      rel='noopener noreferrer'
                      icon={faBellConcierge}
                    >
                      Request Module
                    </Button>
                    <Button href='https://opengb.dev/docs/build/overview' icon={faHammer}>
                      Build Your Own Module
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ) : null}
            {categories.map(category => (
              <motion.section
                layout='position'
                layoutId={category.slug}
                key={category.slug}
                className='mb-10 w-full text-white'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 id={category.slug} className='text-4xl'>
                  {category.name}
                </h1>
                <p className='mb-6 mt-2 text-white/80'>{category.description}</p>
                <div className='grid grid-cols-1 items-start gap-4 sm:grid-cols-3'>
                  {category.modules.map(module => (
                    <Link href={`/modules/${module.id}`} key={module.id} className='h-full'>
                      <ModuleCard {...module} />
                    </Link>
                  ))}
                </div>
              </motion.section>
            ))}
          </LayoutGroup>
        </div>
      </div>
    </>
  );
}
