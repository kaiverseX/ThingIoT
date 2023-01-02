export enum APIs {
  LOGIN = 'auth/login#response=login&useMock=false',
  LOGOUT = 'auth/logout',
  USER_INFO = 'auth/user',

  DEVICES = 'tenant/deviceInfos',
  DEVICE_DETAIL = 'device/info/:id',
}

export enum QueryKey {
  LOGIN = 'login',
  USER_INFO = 'user_info',

  DEVICES = 'device_list',
  DEVICE_DETAIL = 'device_list',
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
