import {ColorScheme, AppShell} from '@mantine/core';
import {useLocalStorage} from '@mantine/hooks';
import {lazy} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {Path} from '~/config/path';
import {usePersistStore} from '~/store';

const AppHeader = lazy(() => import('~/layouts/AppHeader'));
const NavbarNested = lazy(() => import('~/layouts/NavbarNested'));
const ScrollTop = lazy(() => import('~/features/ScrollTop'));

const PrivateOutlet = () => {
  const {accessToken} = usePersistStore();
  const [colorScheme] = useLocalStorage<ColorScheme>({key: 'mantine-color-scheme'});

  return accessToken ? (
    <AppShell
      className={colorScheme} // light | dark
      classNames={{main: 'h-screen'}}
      padding="md"
      navbarOffsetBreakpoint="sm"
      header={<AppHeader />}
      navbar={<NavbarNested />}
    >
      <div className="container m-auto h-full">
        <Outlet />
      </div>
      <ScrollTop />
    </AppShell>
  ) : (
    <Navigate to={Path.LOGIN} replace />
  );
};

export default PrivateOutlet;
