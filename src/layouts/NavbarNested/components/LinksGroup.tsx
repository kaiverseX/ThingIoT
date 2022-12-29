import {ThemeIcon, NavLink, ColorScheme} from '@mantine/core';
import {useLocalStorage} from '@mantine/hooks';
import {Link, useLocation, useMatch, useResolvedPath} from 'react-router-dom';

import {ILinkGroup, ILinkGroupChild} from '~/types/interfaceCommon';

const LinksGroup = ({
  icon: Icon,
  label: groupLabel,
  link: groupLink,
  children: groupChildren,
  disabled: groupDisabled,
}: ILinkGroup) => {
  const [colorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    getInitialValueInEffect: true,
  });

  const {pathname} = useLocation();
  const {pathname: pathNameResolved} = useResolvedPath(groupLink || '#');
  const isGroupActive =
    pathname === pathNameResolved ||
    (pathname.startsWith(pathNameResolved) && pathname.charAt(pathNameResolved.length) === '/');

  const renderChildren = (childrenConfig?: ILinkGroupChild[]) =>
    childrenConfig?.map(({label, link, children, disabled}) => {
      const {pathname: pathnameResolved} = useResolvedPath(link);
      const isActive = !!useMatch({path: pathnameResolved});

      return (
        <div key={label} className="border-l border-neutral-200">
          <NavLink
            className="py-3 pl-7 font-medium"
            component={Link}
            to={link}
            label={label}
            childrenOffset="xl"
            variant="filled"
            active={isActive}
            disabled={disabled}
          >
            {renderChildren(children)}
          </NavLink>
        </div>
      );
    });

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
      className="mb-0.5 py-3 font-medium"
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
    >
      {renderChildren(groupChildren)}
    </NavLink>
  );
};

export default LinksGroup;
