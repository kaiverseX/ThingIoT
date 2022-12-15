import {Navbar, ScrollArea} from '@mantine/core';
import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconNotes,
  IconPresentationAnalytics,
} from '@tabler/icons';
import LinksGroup from './components/LinksGroup';

const mockdata = [
  {label: 'Dashboard', icon: IconGauge},
  {
    label: 'Market news',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      {label: 'Overview', link: '/'},
      {label: 'Forecasts', link: '/'},
      {label: 'Outlook', link: '/'},
      {label: 'Real time', link: '/'},
    ],
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
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
    links: [
      {label: 'Enable 2FA', link: '/'},
      {label: 'Change password', link: '/'},
      {label: 'Recovery codes', link: '/'},
    ],
  },
];

const NavbarNested = () => {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <Navbar width={{base: 250}}>
      <Navbar.Section grow component={ScrollArea}>
        {links}
      </Navbar.Section>
    </Navbar>
  );
};

export default NavbarNested;
