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
      'relative transition text-sm font-semibold text-cream-100 border-4 bg-charcole-950 border-cream-100/10',
      'flex flex-col',
      'text-center items-center',
      'p-4',
      'xl:gap-4 xl:p-8'
    )}>
      <div className='flex h-16 w-16 items-center justify-center text-xl'>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="text-lg font-semibold leading-tight mt-2">{title}</div>
      {usually && <div className="font-semibold text-cream-100/50 text-sm leading-tight mt-6">Usually <Tooltip tip={on}>{usually}</Tooltip></div>}
    </div>
  );
}

const OTHER_SERVICES_SERVER_COUNT = 15;
const OTHER_SERVICES_USER_COUNT = 4;
const OTHER_SERVICES_PRICE = (10 + 0.50) * OTHER_SERVICES_SERVER_COUNT + 9 * OTHER_SERVICES_USER_COUNT + 26 + 40;

export default function IncludedSection() {
  const receiptWidth = 29;
  const otherServicesText = "Other services";
  const otherServicesPrice = `~\$${OTHER_SERVICES_PRICE.toFixed(2)}/mo`;
  return (
    <div className='max-w-6xl mx-auto flex flex-col'>
      <h2 className='text-4xl font-display font-bold tracking-tight text-cream-100 sm:text-5xl text-center'>{'Included for Free'}</h2>
      <div className={clsx(
        "w-full grid gap-4 mt-8 px-4",
        "grid-cols-1",
        "sm:grid-cols-2",
        "md:px-6 md:grid-cols-4",
        "lg:grid-cols-4",
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
      <div className='h-8'/>
      <div className='text-cream-100 text-md md:text-xl mx-auto font-mono whitespace-pre'>
        {/*<div>Your Receipt:</div>
        <div>{"* ".repeat(Math.floor((receiptWidth - 1) / 2))}*</div>*/}
        <div><span className='font-bold'>{otherServicesText}</span>{" ".repeat(receiptWidth - otherServicesText.length - otherServicesPrice.length)}<Tooltip tip="Assuming 15 servers & 4 users">{otherServicesPrice}</Tooltip></div>
        <div><span className='font-bold'>Rivet</span>                   $0.00</div>
      </div>
    </div>
  );
}
