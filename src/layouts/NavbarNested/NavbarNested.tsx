import {Navbar, ScrollArea} from '@mantine/core';
import {IconAdjustments, IconCalendarStats, IconCpu, IconGauge, IconLock} from '@tabler/icons';
import {Path} from '~/config/path';
import {ILinkGroup} from '~/types/interfaceCommon';
import LinksGroup from './components/LinksGroup';

const nestedNavbarConfig: ILinkGroup[] = [
  {label: 'Dashboard', icon: IconGauge, link: Path.HOMEPAGE},
  {
    label: 'Devices',
    icon: IconCpu,
    link: Path.Device,
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    link: '/releases',
    children: [
      {label: 'Upcoming releases', link: '/releases/upcoming/:id'},
      {label: 'Previous releases', link: '/releases/rrevious', disabled: true},
      {label: 'Releases schedule', link: '/releases/schedule'},
    ],
  },
  {
    label: 'Pending feature...',
    icon: IconLock,
    disabled: true,
  },
  {
    label: 'Settings',
    icon: IconAdjustments,
    link: '/settings',
    children: [
      {label: 'Enable 2FA', link: '/settings/2FA', disabled: true},
      {label: 'Change password', link: '/settings/change-password', disabled: true},
      {label: 'Recovery codes', link: '/settings/recovery', disabled: true},
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
