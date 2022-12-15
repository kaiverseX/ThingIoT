import {ErrorCode} from '../types/http';
import {INotiConfig} from '~/types/interfaceNotification';

import {IconExclamationMark, IconWifiOff} from '@tabler/icons';

export const notificationConfig: INotiConfig[] = [
  {
    code: ErrorCode.ERR,
    message: 'common.error.sth_wrong.action',
    color: 'red',
    icon: <IconExclamationMark />,
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
    title: 'common.error.network.title',
    message: 'common.error.network.message',
    color: 'red',
    icon: <IconWifiOff />,
  },
];
