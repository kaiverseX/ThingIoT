import {MantineThemeOverride} from '@mantine/core';
import {NotificationProviderProps} from '@mantine/notifications';
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
 * Mantine Theme: [docs](https://mantine.dev/theming/mantine-provider/).
 * ___
 * ⭐ Wanna use Tailwind Color palette?
 * 
 * 1️⃣ `import tailwindPalette from 'tailwindcss/colors';`
 * 
 * 2️⃣ Convert `tailwindPalette` to Mantine color schema object.
 * 
  `
    Object.fromEntries(Object.entries(tailwindColors).filter(([_, v]) => typeof v !== 'string').map(([k, v]) => [k, Object.values(v)]))
  `
 *   
 * 3️⃣ Remove deprecated/name changed Tailwind palettes from step 2️⃣'s result object. ref: [docs](https://tailwindcss.com/docs/upgrade-guide#color-palette-changes).
 * 
 * 4️⃣ Add new color schema to this config.
 * 
 * Additional info: [Tailwind's palette list](https://tailwindcss.com/docs/customizing-colors)
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
