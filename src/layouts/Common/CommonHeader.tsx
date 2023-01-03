import {Title} from '@mantine/core';
import {useWindowScroll} from '@mantine/hooks';
import {PropsWithChildren} from 'react';
import Breadcrumb from '~/components/Breadcrumb';
import {IBreadcrumbs} from '~/types/interfaceCommon';

const CommonHeader = ({
  title,
  children,
  breadcrumbData,
}: PropsWithChildren<{title: string; breadcrumbData?: IBreadcrumbs['data']}>) => {
  const [{y}] = useWindowScroll();

  return (
    <div
      className={`sticky top-[calc(var(--mantine-header-height)-3rem)] z-[99]
        -mx-4 -mt-4 bg-white p-4 transition-[top] hover:top-[calc(var(--mantine-header-height))] dark:bg-[#1A1B1E]${
          y > 48 ? ' shadow-[0_8px_5px_-5px] shadow-slate-100 dark:shadow-none' : ''
        }`}
    >
      {breadcrumbData && <Breadcrumb data={breadcrumbData} />}
      <div className="flex-center-between">
        <Title size="h2">{title}</Title>
        {children}
      </div>
    </div>
  );
};

export default CommonHeader;
