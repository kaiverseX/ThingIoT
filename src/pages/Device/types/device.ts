export interface IDeviceFilter {
  textSearch: string;
  deviceProfileId: string;
  type?: string;
}

export interface IDeviceList {
  name: string;
  type: string;
  label?: string;

  id: {
    id: string;
    entityType: string;
  };

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

export interface IDeviceDetail extends IDeviceList {
  tenantId: {entityType: string; id: string};
  customerId: {entityType: string; id: string};
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
  deviceProfileId?: {id: string; entityType: string};

  tenantId?: {entityType: string; id: string};
  customerId?: {entityType: string; id: string};
  deviceData?: {
    configuration?: {type: string};
    transportConfiguration?: {type: string};
  };
  firmwareId?: {entityType: string; id: string};
  softwareId?: {entityType: string; id: string};

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
  deviceProfileId: {id: string; entityType: string};

  tenantId?: {entityType: string; id: string};
  customerId?: {entityType: string; id: string};
  deviceData?: {
    configuration?: {type: string};
    transportConfiguration?: {type: string};
  };
  firmwareId?: {entityType: string; id: string};
  softwareId?: {entityType: string; id: string};

  additionalInfo?: {
    gateway: boolean;
    overwriteActivityTime: boolean;
    description?: string;
  };
}

export interface IDeviceUpdate extends IDeviceCreate {
  id: {
    id: string;
    entityType: string;
  };
}
