import {useWindowScroll} from '@mantine/hooks';
import {PropsWithChildren} from 'react';

const StickyFooter = ({children}: PropsWithChildren) => {
  const [{y}] = useWindowScroll();

  return (
    <div
      className={`sticky bottom-0 z-[98] -mx-4 -mt-4 bg-white p-4 dark:bg-[#1A1B1E] dark:shadow-none ${
        y > 0 ? ' shadow-[0_-8px_5px_-5px] shadow-slate-100' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default StickyFooter;
