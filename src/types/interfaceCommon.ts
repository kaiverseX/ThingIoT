import {TablerIcon} from '@tabler/icons';

// export interface IRoute extends RouteObject {
//   path: Path;
// }

export enum ESupportedLangCode {
  EN = 'en',
}

export interface IPagination {
  pageSizePool: number[];
}

export interface LinksGroupProps {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  links?: {label: string; link: string}[];
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

export interface IAccountInfo {
  name: string;
}
