import {ColorSwatch, useMantineTheme} from '@mantine/core';
import {usePersistStore} from '~/store';

const ThemeColors = () => {
  const setTheme = usePersistStore((state) => state.setTheme);
  const theme = useMantineTheme();

  const swatches = Object.keys(theme.colors).map((color) => (
    <ColorSwatch
      key={color}
      className="cursor-pointer opacity-80 hover:opacity-100 hover:shadow-lg"
      component="button"
      color={theme.colors[color][6]}
      size={40}
      onClick={() => setTheme(color)}
    />
  ));

  return <div className="my-4 flex gap-4">{swatches}</div>;
};

export default ThemeColors;
