import {
  Tabs as RivetTabs,
  TabsList as RivetTabsList,
  TabsTrigger as RivetTabsTrigger,
  TabsContent as RivetTabsContent
} from '@rivet-gg/components';
import { Children } from 'react';

export const Tab = ({ title, children }) => {
  return <RivetTabsContent value={title}>{children}</RivetTabsContent>;
};

export const Tabs = ({ children }) => {
  const titles = Children.map(children, child => child.props.title);
  return (
    <RivetTabs defaultValue={titles[0]}>
      <RivetTabsList className='overflow-auto'>
        {titles.map(title => (
          <RivetTabsTrigger key={title} value={title}>
            {title}
          </RivetTabsTrigger>
        ))}
      </RivetTabsList>
      {children}
    </RivetTabs>
  );
};

{
  /* <Tabs defaultValue="logs" className="flex-1 min-h-0 flex flex-col mt-4">
<TabsList className="overflow-auto">
  <TabsTrigger value="logs">Logs</TabsTrigger>
  <TabsTrigger value="headers">Headers</TabsTrigger>
  <TabsTrigger value="request">Request</TabsTrigger>
  <TabsTrigger value="response">Response</TabsTrigger>
</TabsList>
<TabsContent value="headers" className="min-h-0 flex-1 mt-0">
  <GameBackendEventDetailsHeadersTab event={data.event} />
</TabsContent>
<TabsContent value="request" className="min-h-0 flex-1 mt-0">
  <GameBackendEventDetailsWipTab />
</TabsContent>
<TabsContent value="response" className="min-h-0 flex-1 mt-0">
  <GameBackendEventDetailsWipTab />
</TabsContent>
<TabsContent value="logs" className="min-h-0 flex-1 mt-0">
  <GameBackendEventDetailsLogsTab
    logs={data.logs}
    logTimestamps={data.logTimestamps}
  />
</TabsContent>
</Tabs> */
}
