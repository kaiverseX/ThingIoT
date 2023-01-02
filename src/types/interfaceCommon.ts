import {TablerIcon} from '@tabler/icons';
import {HTMLAttributeAnchorTarget, ReactNode} from 'react';

export enum ESupportedLangCode {
  EN = 'en',
}

export type TSortOrder = 'ASC' | 'DESC';

export interface IBreadcrumbs {
  data: {title: string; url?: string}[];
  separator?: ReactNode;
}

export interface IFilter {
  sortOrder?: TSortOrder;
  sortProperty?: string;

  page: number;
  pageSize: number;
}

export interface IListResponse<T> {
  data: T[];
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export interface INavLinkChild {
  label: string;
  link?: string;
  isFullPath?: boolean;
  content?: ReactNode;
  children?: INavLinkChild[];
  target?: HTMLAttributeAnchorTarget;
  disabled?: boolean;
}

export interface INavLink extends INavLinkChild {
  icon: TablerIcon;
}

export interface IUserData {
  id?: {
    id: string;
    entityType: string;
  };
  tenantId?: {
    id: string;
    entityType: string;
  };
  customerId?: {
    id: string;
    entityType: string;
  };
  email: string;
  name?: string;
  authority: string;
  firstName: string;
  lastName: string;
  additionalInfo?: JSON;

  createdTime?: number;
}
