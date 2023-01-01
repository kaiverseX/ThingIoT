import {IFilter} from '~/types/interfaceCommon';

export interface IDeviceFilter extends IFilter {
  type?: string;
  deviceProfileId?: string;
}

export interface IDeviceList {
  name: string;
  type: string;
  label?: string;

  deviceProfileId: {
    id: string;
    entityType: string;
  };
  deviceProfileName: string;

  customerTitle: string;
  customerIsPublic: boolean;

  additionalInfo?: {
    gateway: boolean;
    overwriteActivityTime: boolean;
    description: string;
  };

  createdTime: number;
}
