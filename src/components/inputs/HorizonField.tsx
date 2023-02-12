import {PropsWithChildren} from 'react';

const HorizonField = ({
  label,
  withAsterisk = false,
  children,
}: PropsWithChildren<{label: string; withAsterisk?: boolean}>) => {
  return (
    <div className="flex gap-1">
      <div>
        {label} {withAsterisk && <span>*</span>}
      </div>
      {children}
    </div>
  );
};

export default HorizonField;
