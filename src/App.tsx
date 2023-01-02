import {Suspense} from 'react';
import {useRoutes} from 'react-router-dom';
import {ColorScheme, ColorSchemeProvider, LoadingOverlay, MantineProvider} from '@mantine/core';
import {useColorScheme, useLocalStorage} from '@mantine/hooks';
import {NotificationsProvider} from '@mantine/notifications';

import {defaultLanguage, mantineTheme, notificationPosition} from './config/system';
import routesConfig from './config/routesConfig';
import {usePersistStore} from './store';

const App = () => {
  const defaultColorScheme = useColorScheme();
  const primaryColor = usePersistStore((state) => state.theme);

  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: defaultColorScheme,
    getInitialValueInEffect: true,
  });
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
          <Suspense
            fallback={<LoadingOverlay overlayOpacity={0.3} transitionDuration={500} visible />}
          >
            {routers}
          </Suspense>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
