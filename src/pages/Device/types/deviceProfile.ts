export interface IDeviceInfoList {
  id: {
    id: string;
    entityType: string;
  };
  name: string;
  image?: string;
  defaultDashboardId?: string;
  type: string;
  transportType: string;
}
