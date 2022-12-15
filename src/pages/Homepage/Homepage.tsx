import {lazy, Suspense} from 'react';
import {useTranslation} from 'react-i18next';
import {Skeleton, Title, useMantineTheme} from '@mantine/core';

import {Head} from '~/outlet/Head';

const Showcase = lazy(() => import('~/features/Demos/Showcase'));

const Homepage = () => {
  const {t} = useTranslation();
  const theme = useMantineTheme();

  return (
    <>
      <Head />
      <Title color={theme.primaryColor}>{t('home.pageTitle')}</Title>

      <Suspense fallback={<Skeleton className="h-1/4" visible />}>
        <Showcase />
      </Suspense>
    </>
  );
};

export default Homepage;
