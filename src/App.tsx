import {Suspense, lazy} from 'react';
import {useLocation, useRoutes} from 'react-router-dom';
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  LoadingOverlay,
  MantineProvider,
} from '@mantine/core';
import {useColorScheme, useLocalStorage} from '@mantine/hooks';
import {NotificationsProvider} from '@mantine/notifications';

import {defaultLanguage, mantineTheme, notificationPosition} from './config/system';
import routesConfig from './config/routesConfig';
import {Path} from './config/path';
import {usePersistStore} from './store';

const AppHeader = lazy(() => import('~/layouts/AppHeader'));
const NavbarNested = lazy(() => import('~/layouts/NavbarNested'));

const App = () => {
  const defaultColorScheme = useColorScheme();
  const primaryColor = usePersistStore((state) => state.theme);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: defaultColorScheme,
    getInitialValueInEffect: true,
  });
  const {pathname} = useLocation();
  const routers = useRoutes(routesConfig);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={mantineTheme({
          datesLocale: localStorage.getItem('i18nextLng') || defaultLanguage,
          colorScheme,
          primaryColor,
        })}
      >
        <NotificationsProvider position={notificationPosition}>
          <Suspense fallback={<LoadingOverlay visible />}>
            <AppShell
              className={colorScheme}
              padding="md"
              {...(pathname === Path.LOGIN
                ? {
                    styles: () => ({main: {padding: 0}}),
                  }
                : {
                    header: <AppHeader />,
                    navbar: <NavbarNested />,
                  })}
            >
              {routers}
            </AppShell>
          </Suspense>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
