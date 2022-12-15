import {notificationConfig} from '~/config/notificationConfig';
import {ErrorCode} from '~/types/http';

export const findNotiConfig = (target: ErrorCode) =>
  notificationConfig.find(({code}) => code === target) || notificationConfig[0];
