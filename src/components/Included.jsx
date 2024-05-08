import React from 'react';
import { Tooltip } from "@/components/mdx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShield, faClockRotateLeft, faWarehouse, faBars, faLock,
  faMessageExclamation, faChartLineUp, faRoute
} from '@fortawesome/sharp-solid-svg-icons';
import clsx from 'clsx';

export function IncludedFeature({ icon, title, usually, on }) {
  return (
    <div className={clsx(
      'relative transition text-sm font-semibold text-cream-100 border-2 bg-charcole-950 border-cream-100/20',
      'flex flex-col px-5 py-8',
      'text-center items-center'
    )}>
      <div className='flex h-16 w-16 items-center justify-center text-xl'>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="text-lg font-semibold leading-tight mt-2">{title}</div>
      {usually && <div className="font-semibold text-cream-100/50 text-sm leading-tight mt-6">Usually <Tooltip tip={on}>{usually}</Tooltip></div>}
    </div>
  );
}

export default function IncludedSection() {
  return (
    <div className='max-w-6xl mx-auto px-6 lg:px-8 flex flex-col'>
      <h2 className='text-4xl font-display font-bold tracking-tight text-cream-100 sm:text-5xl text-center'>{'Included for Free'}</h2>
      <div className={clsx(
        "w-full grid gap-2 mt-8",
        "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
      )}>
        <IncludedFeature icon={faShield} title="DDoS Mitigation" usually="$10/server/mo" on="Vultr DDoS mitigation" />
        <IncludedFeature icon={faClockRotateLeft} title="No downtime deploys & instant rollbacks" usually="$40/mo" on="DigitalOcean Kubernetes HA Control Plane" />
        <IncludedFeature icon={faWarehouse} title="Version history for rollbacks" usually="$9/user/mo" on="Docker Hub" />
        <IncludedFeature icon={faBars} title="Log & metrics aggregation" usually="$0.50/server/mo" on="Grafana Cloud Loki with 1 log/server/second" />
        <IncludedFeature icon={faLock} title="Automatic SSL for WebSockets & TLS" />
        <IncludedFeature icon={faMessageExclamation} title="Crash reporting" usually="$26/mo" on="Sentry Team" />
        <IncludedFeature icon={faChartLineUp} title="Analytics" />
        <IncludedFeature icon={faRoute} title="Automatic geographic routing" />
      </div>
    </div>
  );
}
