import {Affix, Transition, ActionIcon, useMantineTheme} from '@mantine/core';
import {useWindowScroll} from '@mantine/hooks';
import {IconArrowUp} from '@tabler/icons';

const ScrollTop = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const theme = useMantineTheme();

  return (
    <Affix position={{bottom: 16, right: 16}}>
      <Transition transition="slide-up" mounted={scroll.y > 400}>
        {(transitionStyles) => (
          <ActionIcon
            variant="filled"
            radius="xl"
            color={theme.primaryColor}
            size="lg"
            onClick={() => scrollTo({y: 0})}
            style={transitionStyles}
          >
            <IconArrowUp size="1.5rem" />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
};

export default ScrollTop;
