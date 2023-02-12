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

export interface IRecordId {
  id: string;
  entityType: string;
}

export interface ICommonData {
  id?: IRecordId;
  additionalInfo?: unknown;
  createdTime?: number;
}

export interface IUserData extends ICommonData {
  tenantId?: IRecordId;
  customerId?: IRecordId;
  email: string;
  name?: string;
  authority: string;
  firstName: string;
  lastName: string;
}

// Break below interfaces if its has its own component.
export interface IRuleChains extends ICommonData {
  tenantId?: IRecordId;
  name: string;
  type: string;
  firstRuleNodeId?: IRecordId;
  root: boolean;
  debugMode: boolean;
  configuration: JSON;
  externalId?: IRecordId;
}

export interface IQueues extends ICommonData {
  tenantId?: IRecordId;
  name: string;
  topic: string;
  pollInterval: number;
  partitions: number;
  consumerPerPartition: boolean;
  packProcessingTimeout: number;
  submitStrategy: {
    type: string;
    batchSize: number;
  };
  processingStrategy: {
    type: string;
    retries: number;
    failurePercentage: number;
    pauseBetweenRetries: number;
    maxPauseBetweenRetries: number;
  };
}
