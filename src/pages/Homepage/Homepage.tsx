import {lazy, Suspense} from 'react';
import {useTranslation} from 'react-i18next';
import {Skeleton, Title, useMantineTheme} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';

import {Head} from '~/outlet/Head';
import {http} from '~/helper/http';
import {QueryKey, APIs} from '~/types/http';
import {IUserData} from '~/types/interfaceCommon';
import {usePersistStore} from '~/store';

const Showcase = lazy(() => import('~/features/Demos/Showcase'));

const Homepage = () => {
  const {t} = useTranslation();
  const theme = useMantineTheme();
  const {setUserData} = usePersistStore();

  useQuery({
    queryKey: [QueryKey.USER_INFO],
    queryFn: () => http.get<IUserData>(APIs.USER_INFO),
    refetchOnWindowFocus: false,
    onSuccess: setUserData,
  });

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
