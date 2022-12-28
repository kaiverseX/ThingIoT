import {Navbar, ScrollArea} from '@mantine/core';
import {
  IconAdjustments,
  IconCalendarStats,
  IconCpu,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconPresentationAnalytics,
} from '@tabler/icons';
import {Path} from '~/config/path';
import {ILinkGroup} from '~/types/interfaceCommon';
import LinksGroup from './components/LinksGroup';

const nestedNavbarConfig: ILinkGroup[] = [
  {label: 'Dashboard', icon: IconGauge},
  {
    label: 'Devices',
    icon: IconCpu,
    link: Path.Device,
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    children: [
      {label: 'Upcoming releases', link: '/'},
      {label: 'Previous releases', link: '/'},
      {label: 'Releases schedule', link: '/'},
    ],
  },
  {label: 'Analytics', icon: IconPresentationAnalytics},
  {label: 'Contracts', icon: IconFileAnalytics},
  {label: 'Settings', icon: IconAdjustments},
  {
    label: 'Security',
    icon: IconLock,
    children: [
      {label: 'Enable 2FA', link: '/'},
      {label: 'Change password', link: '/'},
      {label: 'Recovery codes', link: '/'},
    ],
  },
];

/**
 * `NavbarNested` allows infinite nested level. But we should avoid nested as much as possible.
 *
 * ⚠️`label` of each navbar item must be a *unique* string.
 *___
 * @notes In case of complex navbar routers, use Navbar with multiple collapsible sections instead.
 */
const NavbarNested = () => {
  const renderNavbarItems = nestedNavbarConfig.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <Navbar width={{base: 250}}>
      <Navbar.Section grow component={ScrollArea}>
        {renderNavbarItems}
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarNested;
