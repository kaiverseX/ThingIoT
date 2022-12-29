import {ReactNode} from 'react';
import {Badge, Button} from '@mantine/core';

export const NavItemBadge = (label: string) => (
  <div className="px-4 py-2">
    <Badge
      variant="gradient"
      gradient={{from: 'teal', to: 'lime', deg: 105}}
      classNames={{root: 'max-w-[12rem]'}}
      fullWidth
    >
      {label}
    </Badge>
  </div>
);

export const NavItemExternalLink = (label: string, link: string, Icon?: ReactNode) => (
  <Button
    component="a"
    href={link}
    className="text-base"
    size="lg"
    leftIcon={Icon}
    variant="subtle"
    target="_blank"
    referrerPolicy="no-referrer"
    fullWidth
  >
    {label}
  </Button>
);
