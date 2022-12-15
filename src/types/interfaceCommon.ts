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
  setting: {newOnBot: boolean};
}

export interface IAccountInfo {
  name: string;
}
