import {ENotiCode, ErrorCode} from '~/types/http';
import {NotificationProps} from '@mantine/notifications';

export interface INotiConfig extends NotificationProps {
  code: ErrorCode | ENotiCode;
  title?: string;
  message: string;
}

export enum NotiID {}
