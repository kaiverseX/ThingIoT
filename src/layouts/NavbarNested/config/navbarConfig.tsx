import {Chip} from '@mantine/core';
import {
  IconAdjustments,
  IconCalendarStats,
  IconComponents,
  IconCpu,
  IconGauge,
  IconLock,
} from '@tabler/icons';
import {t} from 'i18next';
import {FullPath, Path} from '~/config/path';
import {INavLink} from '~/types/interfaceCommon';
import {ReactComponent as GoogleLogo} from '~/assets/icon/google.svg';
import {NavItemBadge, NavItemExternalLink} from '../components/examples/CustomNavItems';

export const nestedNavbarConfig: INavLink[] = [
  {label: 'Dashboard', icon: IconGauge, link: Path.HOMEPAGE},
  {
    label: t('device.pageTitle'),
    icon: IconCpu,
    link: Path.DEVICES,
  },
  {
    label: t('setting.pageTitle'),
    icon: IconAdjustments,
    link: Path.SETTING,
  },
];

export const exampleConfig: INavLink[] = [
  {
    label: 'Demo UI',
    icon: IconComponents,
    link: Path.DEMO_UI,
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    link: Path.RELEASES,
    children: [
      {label: 'Upcoming releases', link: Path.RELEASES_UPCOMING, target: '_blank'},
      {
        label: 'A chip item 🤡',
        content: (
          <Chip className="py-4 pl-7" defaultChecked variant="filled">
            Some chip 🍟
          </Chip>
        ),
      },
      {
        label: 'Previous releases',
        link: '/releases/previous',
        disabled: true, // disable this item and all its children.
        children: [
          {
            label: 'A Tarnished of no renown. Cross the fog, to the Lands Between,...',
          },
        ],
      },
      {
        label: 'Releases schedule',
        link: Path.RELEASES_SCHEDULE,
        children: [
          // prefer to use a full path instead?
          {label: 'Milestone', link: FullPath.RELEASES_SCHEDULE_MILESTONES, isFullPath: true},

          {label: 'Target', link: Path.RELEASES_SCHEDULE_TARGETS},
          {label: 'Others', link: '/others', disabled: true}, // disable deepest item.
        ],
      },
      {
        label: 'Nah, I prefer custom.',
        link: '/custom-nav',

        // Allow to fully custom content of an item.
        // For case like need to show data from server, badge realtime notification, etc...
        content: NavItemBadge('Nah, I prefer CUSTOMIZATION.'),
      },
    ],
  },
  {
    label: 'Pending feature...',
    icon: IconLock,
    disabled: true, // disable the entire group.
    children: [
      {
        label: 'A child never sees the light.',
      },
    ],
  },
  {
    label: 'Google',
    icon: IconLock,
    content: NavItemExternalLink('LMGIFY', 'https://www.google.com/', <GoogleLogo />),
  },
];
