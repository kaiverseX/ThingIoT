import {Blockquote, Divider, Alert, Button, Image} from '@mantine/core';
import {IconAlertCircle, IconPlus} from '@tabler/icons';
import {useTranslation} from 'react-i18next';

import GridNotes from './GridNotes';
import {TableDemo} from './Table';
import RandImg from '~/assets/animated/decor/4.svg';
import NotiTrigger from './NotiTrigger';
import CarouselFull from '~/components/CarouselFull';
import ThemeColors from '~/features/ThemeColors';

const images = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://source.unsplash.com/user/erondu',
  'https://source.unsplash.com/user/thedanrogers',
  'https://source.unsplash.com/user/tianshu',
  'https://source.unsplash.com/user/petervanosdall',
  RandImg,
];

const Showcase = () => {
  const {t} = useTranslation();

  return (
    <>
      <Divider my="xl" variant="dashed" />
      <ThemeColors />

      <Divider my="xl" variant="dashed" />
      <Blockquote cite="- Forrest Gump">
        Life is like an npm install - you never know what you are going to get.
      </Blockquote>

      <Divider my="xl" variant="dashed" />
      <Alert icon={<IconAlertCircle size={16} />} title="Alert Example!">
        Something terrible happened! You made a mistake and there is no going back, your data was
        lost forever!
      </Alert>

      <Divider my="xl" variant="dashed" />
      <CarouselFull
        images={images}
        imageProps={{height: '24rem'}}
        slideSize="50%"
        autoPlay={5000}
      />

      <Divider my="xl" variant="dashed" />
      <div className="my-4">
        <Button
          leftIcon={<IconPlus size={20} />}
          styles={() => ({leftIcon: {marginRight: 5}})}
          radius="md"
        >
          {t('common.add')}
        </Button>
      </div>
      <TableDemo />

      <Divider my="xl" variant="dashed" />
      <NotiTrigger />

      <Divider my="xl" variant="dashed" />
      <GridNotes />

      <Divider my="xl" variant="dashed" />
      <Image src={RandImg} alt="Random decor image" />
    </>
  );
};

export default Showcase;
