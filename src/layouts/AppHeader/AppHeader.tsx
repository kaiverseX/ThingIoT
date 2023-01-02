import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {
  ActionIcon,
  Header,
  Tooltip,
  useMantineColorScheme,
  Avatar,
  Menu,
  Text,
  Image,
} from '@mantine/core';

import {defaultLanguage} from '~/config/system';
import i18n from '~/config/i18n';
import {Path} from '~/config/path';
import {IconLogout, IconMoonStars, IconSettings, IconSun} from '@tabler/icons';
import {usePersistStore} from '~/store';
import {useMutation} from '@tanstack/react-query';
import {http} from '~/helper/http';
import {APIs} from '~/types/http';

const AppHeader = () => {
  const {t} = useTranslation();
  const {userData, resetUserStore, resetAuthStore} = usePersistStore();
  const {colorScheme, toggleColorScheme} = useMantineColorScheme();

  const isDarkMode = colorScheme === 'dark';
  const decorBgRand = Math.floor(Math.random() * 4) + 1;

  const [toggleLang, setToggleLang] = useState(
    localStorage.getItem('i18nextLng') || defaultLanguage,
  );

  const {isLoading, mutate: mutationLogout} = useMutation({
    mutationFn: () => http.post(APIs.LOGOUT),
    onSuccess: () => {
      resetUserStore();
      resetAuthStore();
    },
  });

  useEffect(() => {
    i18n.changeLanguage(toggleLang);
  }, [toggleLang]);

  useEffect(() => {
    if (i18n.resolvedLanguage === defaultLanguage && toggleLang !== defaultLanguage) {
      setToggleLang(defaultLanguage);
    }
  }, []);

  return (
    <Header height={60} className="flex-center-between px-4">
      <Link className="cursor-pointer no-underline" to={Path.HOMEPAGE}>
        <span className="bg-gradient-to-r from-rose-500 to-violet-500 bg-clip-text text-3xl font-bold text-transparent">
          Deviceverse
        </span>
      </Link>

      <div className="flex-center-between">
        <Tooltip withArrow label={t(`common.theme.${colorScheme}`)}>
          <ActionIcon
            variant="outline"
            size="lg"
            radius="xl"
            color={isDarkMode ? 'yellow' : ''}
            onClick={() => toggleColorScheme()}
          >
            {isDarkMode ? <IconMoonStars size={18} /> : <IconSun size={18} />}
          </ActionIcon>
        </Tooltip>
        {/* {renderToggleLang} */}

        <Menu position="bottom-end" width="16rem" shadow="lg">
          <Menu.Target>
            <Avatar className="cursor-pointer" src={null} radius="xl" alt="User avatar" />
          </Menu.Target>

          <Menu.Dropdown>
            <div className="mb-3 text-center">
              <div className="overflow-hidden rounded">
                <Image
                  height={80}
                  src={
                    new URL(`/src/assets/animated/decor/${decorBgRand}.svg`, import.meta.url).href
                  }
                  alt="Random decor image"
                />
              </div>

              <Text size="md" weight={500}>
                {userData.name || userData.email || t('auth.unknown')}
              </Text>
              {!userData.name && (
                <Text color="dimmed" size="xs">
                  {userData.email}
                </Text>
              )}
            </div>
            <Menu.Item icon={<IconSettings size={14} />} component={Link} to={Path.SETTING}>
              {t('setting.pageTitle')}
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              icon={<IconLogout size={14} />}
              onClick={() => mutationLogout()}
              disabled={isLoading}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </Header>
  );
};

export default AppHeader;
