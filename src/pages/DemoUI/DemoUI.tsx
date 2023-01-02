import {lazy, Suspense} from 'react';
import {Skeleton, Title, useMantineTheme} from '@mantine/core';

import {Head} from '~/outlet/Head';
const Showcase = lazy(() => import('./components/Showcase'));

const DemoUI = () => {
  const {primaryColor} = useMantineTheme();

  return (
    <>
      <Head title="Demo UI" />
      <Title color={primaryColor}>Demo Components</Title>

      <Suspense fallback={<Skeleton className="h-1/4" visible />}>
        <Showcase />
      </Suspense>
    </>
  );
};

export default DemoUI;
