export enum APIs {
  LOGIN = 'auth/login#response=login&useMock=false',
  LOGOUT = 'auth/logout',
  USER_INFO = 'auth/user',

  DEVICES = 'tenant/deviceInfos',
  DEVICE_DETAIL = 'device/info/:id',
  DEVICE_MUTATE = 'device',
  DEVICE_PROFILE = 'deviceProfile',
  DEVICE_PROFILE_LIST = 'deviceProfileInfos',
  DEVICE_RULECHAINS = 'ruleChains',
  DEVICE_QUEUES = 'queues',
}

export enum QueryKey {
  LOGIN = 'login',
  USER_INFO = 'user_info',

  DEVICES = 'device_list',
  DEVICE_DETAIL = 'device_detail',
  DEVICE_PROFILE_LIST = 'device_profile_lists',
  DEVICE_RULECHAINS = 'device_rulechains',
  DEVICE_QUEUES = 'device_queues',
}

export enum ErrorCode {
  ERR = 'ERR',
  ERR_SOCKET = 'ERR_SOCKET',
  ERR_NETWORK = 'ERR_NETWORK',
  ERR_CANCELED = 'ERR_CANCELED',
}

export enum ENotiCode {
  PAGING_OUT_RANGE = 'PAGING_OUT_RANGE',
}
