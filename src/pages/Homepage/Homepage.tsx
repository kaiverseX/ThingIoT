import {useTranslation} from 'react-i18next';
import {Button, Title, useMantineTheme} from '@mantine/core';
import {useQuery} from '@tanstack/react-query';

import {Head} from '~/outlet/Head';
import {http} from '~/helper/http';
import {QueryKey, APIs} from '~/types/http';
import {IUserData} from '~/types/interfaceCommon';
import {usePersistStore} from '~/store';
import {Link} from 'react-router-dom';
import {Path} from '~/config/path';
import {IconAdjustments} from '@tabler/icons';

const Homepage = () => {
  const {t} = useTranslation();
  const theme = useMantineTheme();
  const {setUserData} = usePersistStore();

  useQuery({
    queryKey: [QueryKey.USER_INFO],
    queryFn: () => http.get<IUserData>(APIs.USER_INFO),
    onSuccess: setUserData,
  });

  return (
    <>
      <Head />
      <Title color={theme.primaryColor}>{t('home.pageTitle')}</Title>

      <div className="my-4">
        <Button
          component={Link}
          to={Path.DEMO_UI}
          leftIcon={<IconAdjustments size={20} />}
          radius="md"
        >
          Go to UI Demo
        </Button>
      </div>
    </>
  );
};

export default Homepage;
