import {ENotiCode, ErrorCode} from '../types/http';
import {INotiConfig} from '~/types/interfaceNotification';

import {IconExclamationMark, IconWifiOff} from '@tabler/icons';
import {t} from 'i18next';

export const notificationConfig: INotiConfig[] = [
  {
    code: ErrorCode.ERR,
    message: t('common.error.sth_wrong.action'),
    color: 'red',
    icon: <IconExclamationMark />,
  },
  {
    code: ENotiCode.PAGING_OUT_RANGE,
    message: t('common.info.paging_out_range'),
  },
  // {
  //   code: ErrorCode.ERR_SOCKET,
  //   title: 'common.error.socket.title',
  //   message: 'common.error.socket.message',
  //   color: 'red',
  //   icon: <IconWifiOff />,
  //   autoClose: false,
  //   onClose: () => socket.connect(),
  // },
  // {
  //   code: ErrorCode.ERR_SOCKET_DEVICE_NOTFOUND,
  //   title: 'common.error.device_notfound.title',
  //   message: '',
  //   color: 'red',
  //   icon: <IconQuestionMark />,
  // },
  {
    code: ErrorCode.ERR_NETWORK,
    title: t('common.error.network.title'),
    message: t('common.error.network.message'),
    color: 'red',
    icon: <IconWifiOff />,
  },
];
