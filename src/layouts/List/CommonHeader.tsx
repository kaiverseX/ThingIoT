import {Title} from '@mantine/core';
import {PropsWithChildren} from 'react';

const CommonHeader = ({title, children}: PropsWithChildren<{title: string}>) => {
  return (
    <div className="flex-center-between">
      <Title size="h2">{title}</Title>
      {children}
    </div>
  );
};

export default CommonHeader;
