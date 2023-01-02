import {notificationConfig} from '~/config/notificationConfig';
import {ENotiCode, ErrorCode} from '~/types/http';

export const findNotiConfig = (target: ErrorCode | ENotiCode) =>
  notificationConfig.find(({code}) => code === target) || notificationConfig[0];
