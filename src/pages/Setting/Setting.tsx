import {Title, useMantineTheme} from '@mantine/core';
import {useTranslation} from 'react-i18next';

import ThemeColors from '~/features/ThemeColors';
import {Head} from '~/outlet/Head';

const Setting = () => {
  const {t} = useTranslation();
  const theme = useMantineTheme();

  return (
    <>
      <Head title={t('setting.pageTitle')} />
      <Title color={theme.primaryColor}>{t('setting.pageTitle')}</Title>

      <ThemeColors />
    </>
  );
};

export default Setting;
