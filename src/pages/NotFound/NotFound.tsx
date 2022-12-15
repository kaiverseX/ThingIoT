import {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {Button, Image, Text, Title} from '@mantine/core';

import {Path} from '~/config/path';
import {Head} from '~/outlet/Head';

import Animated404 from '~/assets/icon/404-animated.svg';

const NotFound = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const srcImageRand = useRef(Math.floor(Math.random() * 2));

  return (
    <div className="flex h-full items-center gap-4">
      <Head title="404" />

      <div className="flex-1">
        <Title>{t('common.error.sth_wrong.normal')}</Title>
        <Text color="dimmed" size="lg" className="my-4">
          {t('common.not_found.description')}
        </Text>

        <Button onClick={() => navigate(Path.HOMEPAGE)}>{t('common.home_page')}</Button>
      </div>
      {srcImageRand.current ? (
        <div className="flex-1">
          <object type="image/svg+xml" data={Animated404}>
            404-svg-animation
          </object>
        </div>
      ) : (
        <Image className="flex-1" src="src/assets/icon/404.svg" />
      )}
    </div>
  );
};

export default NotFound;
