import {ICommonData, IRecordId} from '~/types/interfaceCommon';

export interface IDeviceFilter {
  textSearch: string;
  deviceProfileId: string;
  type?: string;
}

export interface IDeviceList extends ICommonData {
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
}

export interface IDeviceDetail extends IDeviceList {
  tenantId: IRecordId;
  customerId: IRecordId;
  deviceData: {
    configuration: {type: string};
    transportConfiguration: {type: string};
  };

  firmwareId: string | null;
  softwareId: string | null;
  externalId: string | null;
}

export interface IDeviceMutateForm {
  name: string;
  type: string;
  label: string;
  deviceProfileId?: IRecordId;
  deviceProfileControl: 'new' | 'existing';

  tenantId?: IRecordId;
  customerId?: IRecordId;
  deviceData?: {
    configuration?: {type: string};
    transportConfiguration?: {type: string};
  };
  firmwareId?: IRecordId;
  softwareId?: IRecordId;

  additionalInfo: {
    gateway: boolean;
    overwriteActivityTime: boolean;
    description?: string;
  };
}

export interface IDeviceCreate {
  name: string;
  type: string;
  label: string;
  deviceProfileId: IRecordId;

  tenantId?: IRecordId;
  customerId?: IRecordId;
  deviceData?: {
    configuration?: {type: string};
    transportConfiguration?: {type: string};
  };
  firmwareId?: IRecordId;
  softwareId?: IRecordId;

  additionalInfo?: {
    gateway: boolean;
    overwriteActivityTime: boolean;
    description?: string;
  };
}

export interface IDeviceUpdate extends IDeviceCreate {
  id: IRecordId;
}
