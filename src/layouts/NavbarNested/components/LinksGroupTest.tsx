import {Collapse, ThemeIcon, useMantineTheme, NavLink as NavLinkStyled} from '@mantine/core';

import {ILinkGroup, ILinkGroupChild} from '~/types/interfaceCommon';
import {NavLink} from 'react-router-dom';
import {useState} from 'react';
import {IconChevronRight} from '@tabler/icons';

const LinksGroupTest = ({
  icon: Icon,
  label: groupLabel,
  link: groupLink,
  children: groupChildren,
  disabled: groupDisabled = false,
}: ILinkGroup) => {
  const [opened, setOpened] = useState(false);
  const {primaryColor, colors} = useMantineTheme();

  const renderChildren = (childrenConfig?: ILinkGroupChild[]) =>
    childrenConfig?.map(({label, link, children, disabled}) => {
      return (
        <div key={label} className="ml-7 border-l border-neutral-200">
          <NavLink className="no-underline" to={link}>
            {({isActive}) => (
              <div
                className={`py-3 pl-7 font-medium text-slate-600 hover:text-black dark:hover:text-white ${
                  isActive ? 'dark:text-white' : 'dark:text-neutral-400'
                }`}
              >
                {label}
              </div>
            )}
          </NavLink>
        </div>
      );
    });

  return (
    <>
      <NavLink className="no-underline" to={groupLink} onClick={() => setOpened((o) => !o)}>
        {({isActive}) => (
          <div
            className={`flex items-center justify-between px-4 py-2 font-medium text-slate-600 hover:text-black dark:hover:text-white ${
              isActive ? 'dark:text-white' : 'dark:text-neutral-400'
            }`}
            style={isActive ? {backgroundColor: colors[primaryColor][1]} : undefined}
          >
            <div className="flex items-center">
              <ThemeIcon className="mr-2" variant="light" size={30}>
                <Icon size={18} />
              </ThemeIcon>
              {groupLabel}
            </div>

            {groupChildren && (
              <IconChevronRight
                className="transition"
                size={14}
                stroke={1.5}
                style={{
                  transform: opened ? 'rotate(90deg)' : 'none',
                }}
              />
            )}
          </div>
        )}
      </NavLink>
      <Collapse in={opened}>{renderChildren(groupChildren)}</Collapse>
    </>
  );
};

export default LinksGroupTest;
