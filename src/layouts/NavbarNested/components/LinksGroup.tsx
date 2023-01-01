import {ThemeIcon, NavLink, ColorScheme} from '@mantine/core';
import {useLocalStorage} from '@mantine/hooks';
import {Link, useLocation, useResolvedPath} from 'react-router-dom';

import {INavLink} from '~/types/interfaceCommon';
import {renderChildren} from './NavChildren';

const LinksGroup = ({
  icon: Icon,
  label: groupLabel,
  link: groupLink,
  children: groupChildren,
  content: groupContent,
  disabled: groupDisabled,
  ...props
}: INavLink) => {
  const [colorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    getInitialValueInEffect: true,
  });

  const {pathname} = useLocation();
  const {pathname: pathNameGroupResolved} = useResolvedPath(groupLink || '#');
  const isGroupActive =
    pathname === pathNameGroupResolved ||
    (pathname.startsWith(pathNameGroupResolved) &&
      pathname.charAt(pathNameGroupResolved.length) === '/');

  if (groupContent) {
    return <>{groupContent}</>;
  }

  if (groupDisabled || !groupLink) {
    return (
      <NavLink
        className="mb-0.5 py-3 font-medium"
        label={groupLabel}
        icon={
          <ThemeIcon variant="light" size={30}>
            <Icon size={18} />
          </ThemeIcon>
        }
        disabled
      />
    );
  }

  return (
    <NavLink
      className="mt-1 mb-0.5 py-3 font-medium"
      component={Link}
      to={groupLink}
      label={groupLabel}
      childrenOffset="xl"
      icon={
        <ThemeIcon variant={colorScheme === 'dark' ? 'outline' : 'light'} size={30}>
          <Icon size={18} />
        </ThemeIcon>
      }
      variant={groupChildren ? 'light' : 'filled'}
      active={isGroupActive}
      defaultOpened={isGroupActive}
      referrerPolicy="no-referrer"
      {...props}
    >
      {renderChildren(groupLink, groupChildren)}
    </NavLink>
  );
};

export default LinksGroup;
