import {MantineThemeColors, MantineThemeOverride} from '@mantine/core';
import {NotificationProviderProps} from '@mantine/notifications';
import {usePersistStore} from '~/store';
import {IPagination, ESupportedLangCode} from '~/types/interfaceCommon';
import {safeAnyToNumber} from '~/util/primitiveHandle';

/**
 * Get & process environment variables (.env)
 */
export const SERVICE_NAME = import.meta.env.VITE_SERVICE_NAME;
export const afkTimeout = safeAnyToNumber(import.meta.env.VITE_IDLE_TIMEOUT, 14400000); // 4 hours

/**
 * Language config
 */
export const defaultLanguage = ESupportedLangCode.EN;

/**
 * Common components config
 */
export const paginationConfig: IPagination = {
  pageSizePool: [10, 15, 20], // the default pageSize is value of the first element.
};

/**
 * Theme & Color schema
 *
 * https://mantine.dev/theming/mantine-provider/
 */
const mantineThemeConfig: MantineThemeOverride = {
  // default theme config
  // colors: {
  //   dark: [
  //     '#FFFFFF',
  //     '#A6A7AB',
  //     '#909296',
  //     '#5C5F66',
  //     '#373A40',
  //     '#2C2E33',
  //     '#25262B',
  //     '#1A1B1E',
  //     '#141517',
  //     '#101113',
  //   ],
  // },
};

export const mantineTheme = (mantineCustom: MantineThemeOverride): MantineThemeOverride => {
  return {...mantineThemeConfig, ...mantineCustom};
};

export const notificationPosition: NotificationProviderProps['position'] = 'top-right';
