import { forwardRef, useState, useEffect, Fragment } from "react";
import { usePostHog } from "posthog-js/react";
import { useRouter } from "next/router";
import { Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { Button } from '@/components/Button'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function FeedbackButton(props) {
    return (
        <button
            type='submit'
            className='px-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white'
            {...props}
        />
    );
}

function EditButton() {
    let router = useRouter();
    // let href = `https://github.com/rivet-gg/site/tree/main/src/pages/${router.pathname}.mdx`;
    let href = `https://github.com/rivet-gg/site/edit/main/src/pages/${router.pathname}.mdx`;

    return (
        <Button variant='secondary' icon={faGithub} href={href} target='_blank'>Edit Page</Button>
    );
}

const FeedbackForm = forwardRef(function FeedbackForm({ onSubmit }, ref) {
    return (
        <form
            ref={ref}
            onSubmit={onSubmit}
            className='absolute inset-0 flex items-center justify-center md:justify-start'
        >
            <p className='text-sm text-zinc-600 dark:text-zinc-400 mr-5'>Was this page helpful?</p>
            <div className='group grid h-8 grid-cols-[1fr,1px,1fr] overflow-hidden rounded-full border border-zinc-900/10 dark:border-white/10 mr-5'>
                <FeedbackButton data-response='yes'>Yes</FeedbackButton>
                <div className='bg-zinc-900/10 dark:bg-white/10' />
                <FeedbackButton data-response='no'>No</FeedbackButton>
            </div>
            <EditButton/>
        </form>
    );
});

const FeedbackThanks = forwardRef(function FeedbackThanks(_props, ref) {
    return (
        <div ref={ref} className='absolute inset-0 flex justify-center md:justify-start'>
            <div className='flex items-center rounded-full bg-violet-50/50 py-1 pl-1.5 pr-3 text-sm text-violet-900 ring-1 ring-inset ring-violet-500/20 dark:bg-violet-500/5 dark:text-violet-200 dark:ring-violet-500/30 mr-4'>
                <CheckIcon className='h-5 w-5 flex-none fill-violet-500 stroke-white dark:fill-violet-200/20 dark:stroke-violet-200 mr-3' />
                Thanks for your feedback!
            </div>
            <EditButton/>
        </div>
    );
});

export function Feedback() {
    const posthog = usePostHog();

    let router = useRouter();
    let feedbackKey = `feedback:${router.pathname}`;
    let [submitted, setSubmitted] = useState(false);

    // Populate submitted
    useEffect(() => {
        if (localStorage.getItem(feedbackKey)) {
            setSubmitted(true);
        }
    }, [feedbackKey]);

    // Handle submission
    function onSubmit(event) {
        event.preventDefault();

        // Send event
        posthog?.capture('page_feedback', {
            page: router.pathname,
            helpful: event.nativeEvent.submitter.dataset.response === 'yes'
        });

        // Update state
        localStorage.setItem(feedbackKey, 'true');
        setSubmitted(true);
    }

    return (
        <div className='relative h-8 prose'>
            <Transition
                show={!submitted}
                as={Fragment}
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                leave='pointer-events-none duration-300'
            >
                <FeedbackForm onSubmit={onSubmit} />
            </Transition>
            <Transition
                show={submitted}
                as={Fragment}
                enterFrom='opacity-0'
                enterTo='opacity-100'
                enter='delay-150 duration-300'
            >
                <FeedbackThanks />
            </Transition>
        </div>
    );
}
