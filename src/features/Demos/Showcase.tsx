import {Blockquote, Divider, Alert, Button, Image} from '@mantine/core';
import {IconAlertCircle, IconPlus} from '@tabler/icons';
import {useTranslation} from 'react-i18next';

import GridNotes from './GridNotes';
import {TableDemo} from './Table';
import RandImg from '~/assets/animated/decor/4.svg';
import NotiTrigger from './NotiTrigger';
import ThemeColors from '../ThemeColors';

const Showcase = () => {
  const {t} = useTranslation();

  return (
    <>
      <ThemeColors />

      <Blockquote cite="- Forrest Gump">
        Life is like an npm install - you never know what you are going to get.
      </Blockquote>

      <Divider my="xl" variant="dashed" />
      <Alert icon={<IconAlertCircle size={16} />} title="Alert Example!">
        Something terrible happened! You made a mistake and there is no going back, your data was
        lost forever!
      </Alert>

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
