'use client';
import { Children, createContext, useContext, useEffect, useRef, useState } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

import { Tag } from '@/components/Tag';

function getPanelTitle({ title }) {
  return title;
}

function PanelHeader({ tag, label }) {
  if (!tag && !label) {
    return null;
  }

  return (
    <div className='flex h-9 items-center gap-2 border-y border-b-white/7.5 border-t-transparent bg-charcole-950 bg-white/2.5 px-4 dark:border-b-white/5 dark:bg-white/1'>
      {tag && (
        <div className='dark flex'>
          <Tag variant='small'>{tag}</Tag>
        </div>
      )}
      {tag && label && <span className='h-0.5 w-0.5 rounded-full bg-cream-500' />}
      {label && <span className='font-mono text-xs text-cream-400'>{label}</span>}
    </div>
  );
}

function Panel({ tag, label, children }) {
  let child = Children.only(children);

  return (
    <div className='group dark:bg-white/2.5'>
      <PanelHeader tag={child.props.tag ?? tag} label={child.props.label ?? label} />
      <div className='relative overflow-auto px-4 text-white'>{children}</div>
    </div>
  );
}

function GroupHeader({ title, children, selectedIndex }) {
  let hasTabs = Children.count(children) > 1;

  if (!title && !hasTabs) {
    return null;
  }

  return (
    <div className='flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-start gap-x-4 border-b border-charcole-700 bg-charcole-800 px-4 dark:border-charcole-800 dark:bg-transparent'>
      {title && <h3 className='mr-auto pt-3 font-sans text-xs font-semibold text-white'>{title}</h3>}
      {hasTabs && (
        <Tab.List className='-mb-px flex gap-4 text-xs font-medium'>
          {Children.map(children, (child, childIndex) => (
            <Tab
              className={clsx(
                'border-b py-3 transition focus:[&:not(:focus-visible)]:outline-none',
                childIndex === selectedIndex
                  ? 'border-violet-500 text-violet-400'
                  : 'border-transparent text-cream-400 hover:text-cream-100'
              )}>
              {getPanelTitle(child.props)}
            </Tab>
          ))}
        </Tab.List>
      )}
    </div>
  );
}

function GroupPanels({ children, ...props }) {
  let hasTabs = Children.count(children) > 1;

  if (hasTabs) {
    return (
      <Tab.Panels>
        {Children.map(children, child => (
          <Tab.Panel>
            <Panel {...props}>{child}</Panel>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    );
  }

  return <Panel {...props}>{children}</Panel>;
}

function usePreventLayoutShift() {
  let positionRef = useRef();
  let rafRef = useRef();

  useEffect(() => {
    return () => {
      window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return {
    positionRef,
    preventLayoutShift(callback) {
      let initialTop = positionRef.current.getBoundingClientRect().top;

      callback();

      rafRef.current = window.requestAnimationFrame(() => {
        let newTop = positionRef.current.getBoundingClientRect().top;
        window.scrollBy(0, newTop - initialTop);
      });
    }
  };
}

function useTabGroupProps() {
  let [selectedIndex, setSelectedIndex] = useState(0);
  let { positionRef } = usePreventLayoutShift();

  return {
    as: 'div',
    ref: positionRef,
    selectedIndex,
    onChange: newSelectedIndex => {
      setSelectedIndex(newSelectedIndex);
    }
  };
}

const GroupContext = createContext(false);

export function Tabs({ children, title, ...props }) {
  let tabGroupProps = useTabGroupProps();
  let hasTabs = Children.count(children) > 1;
  let Container = hasTabs ? Tab.Group : 'div';
  let containerProps = hasTabs ? tabGroupProps : {};
  let headerProps = hasTabs ? { selectedIndex: tabGroupProps.selectedIndex } : {};

  return (
    <GroupContext.Provider value={true}>
      <Container
        {...containerProps}
        className='my-6 overflow-hidden rounded-2xl bg-charcole-950 shadow-md dark:ring-1 dark:ring-white/10'>
        <GroupHeader title={title} {...headerProps}>
          {children}
        </GroupHeader>
        <GroupPanels {...props}>{children}</GroupPanels>
      </Container>
    </GroupContext.Provider>
  );
}
