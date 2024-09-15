import { Header } from '@/components/v2/Header';
import { ModulePageLink } from '@/components/ModulePageLink';

function Subnav() {
  return (
    <div className='-mx-8 -mb-[9px] hidden min-h-10 items-center px-8 empty:hidden md:flex'>
      <ModulePageLink href='/docs/godot'>Godot</ModulePageLink>
      <ModulePageLink href='/docs/unity'>Unity</ModulePageLink>
      <ModulePageLink href='/docs/unreal'>Unreal</ModulePageLink>
      <ModulePageLink href='/docs/html5'>HTML5</ModulePageLink>
      <ModulePageLink href='/docs/custom'>Custom</ModulePageLink>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <Header active='docs' subnav={<Subnav />} />
      <div className='flex w-full'>
        <div className='md:grid-cols-docs mx-auto flex flex-col md:grid md:px-6'>{children}</div>
      </div>
    </>
  );
}
