import {ThemeIcon, NavLink} from '@mantine/core';

import {ILinkGroup, ILinkGroupChild} from '~/types/interfaceCommon';
import {Link, useLocation} from 'react-router-dom';
import {Path} from '~/config/path';

const LinksGroup = ({
  icon: Icon,
  label: groupLabel,
  link: groupLink,
  children: groupChildren,
}: ILinkGroup) => {
  const {pathname} = useLocation();
  const isGroupActive = !!groupLink && pathname !== Path.HOMEPAGE && pathname.includes(groupLink);

  const renderChildren = (childrenConfig?: ILinkGroupChild[]) =>
    childrenConfig?.map(({label, link, children}) => (
      <div key={label} className="border-l border-neutral-200">
        <NavLink
          classNames={{
            root: 'py-3 pl-7 text-slate-600 font-medium hover:text-black dark:text-neutral-400 dark:hover:text-white',
          }}
          component={Link}
          to={link}
          label={label}
          childrenOffset="xl"
          variant="light"
          active={pathname !== Path.HOMEPAGE && pathname === link}
        >
          {renderChildren(children)}
        </NavLink>
      </div>
    ));

  return (
    <NavLink
      classNames={{
        root: `py-3 text-slate-600 font-medium hover:text-black dark:${
          isGroupActive ? 'text-white' : 'text-neutral-400'
        } dark:hover:text-white `,
      }}
      component={Link}
      to={groupLink || '#'}
      label={groupLabel}
      childrenOffset="xl"
      icon={
        <ThemeIcon variant="light" size={30}>
          <Icon size={18} />
        </ThemeIcon>
      }
      variant="light"
      active={isGroupActive}
      disabled={!groupLink && !groupChildren}
    >
      {renderChildren(groupChildren)}
    </NavLink>
  );
};

export default LinksGroup;
