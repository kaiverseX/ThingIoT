import {IRecordId} from '~/types/interfaceCommon';

export interface IDeviceInfoList {
  id: IRecordId;
  name: string;
  image?: string;
  defaultDashboardId?: string;
  type: string;
  transportType: string;
}

export interface IDeviceProfileCreate {
  name: string;
  type: string;

  defaultQueueName: string;
  transportType: string;
  provisionType: string;
  profileData: {
    configuration: {
      type: string;
    };
    transportConfiguration: {
      type: string;
    };
    alarms?: null;
    provisionConfiguration: {
      type: string;
    };
  };
  defaultRuleChainId?: IRecordId;
}
