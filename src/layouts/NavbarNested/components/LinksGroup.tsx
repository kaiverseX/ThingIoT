import {ThemeIcon, NavLink, ColorScheme} from '@mantine/core';
import {useLocalStorage} from '@mantine/hooks';
import {Link, useLocation, useMatch, useResolvedPath} from 'react-router-dom';

import {INavLink, INavLinkChild} from '~/types/interfaceCommon';

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

  const renderChildren = (
    parentPath: INavLinkChild['link'] = '',
    childrenConfig?: INavLinkChild[],
  ) =>
    childrenConfig?.map(({label, link = '', children, content, isFullPath, ...propsChild}) => {
      const childPath = isFullPath ? link : `${parentPath}${link}`;
      const {pathname: pathnameResolved} = useResolvedPath(childPath);
      const isActive =
        pathname === pathnameResolved ||
        (pathname.startsWith(pathnameResolved) && pathname.charAt(pathnameResolved.length) === '/');
      // const isActive = !!useMatch({path: pathnameResolved}); // this has bugs

      if (content) {
        return (
          <div key={label} className="w-full overflow-hidden border-l border-neutral-200">
            {content}
          </div>
        );
      }

      return (
        <div key={label} className="border-l border-neutral-200">
          {childPath ? (
            <NavLink
              className="py-3 pl-7 font-medium"
              component={Link}
              to={childPath}
              label={label}
              childrenOffset="xl"
              variant={children ? 'light' : 'filled'}
              active={isActive}
              defaultOpened={isActive}
              referrerPolicy="no-referrer"
              {...propsChild}
            >
              {renderChildren(childPath, children)}
            </NavLink>
          ) : (
            <NavLink className="py-3 pl-7 font-medium" label={label} disabled />
          )}
        </div>
      );
    });

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
