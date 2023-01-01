import {NavLink} from '@mantine/core';
import {useResolvedPath, Link, useLocation} from 'react-router-dom';
import {INavLinkChild} from '~/types/interfaceCommon';

export const renderChildren = (
  parentPath: INavLinkChild['link'] = '',
  childrenConfig?: INavLinkChild[],
) =>
  childrenConfig?.map(({label, link = '', children, content, isFullPath, ...propsChild}) => {
    const childPath = isFullPath ? link : `${parentPath}${link}`;

    const {pathname} = useLocation();
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
