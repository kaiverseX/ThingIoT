export enum APIs {
  LOGIN = 'auth/login#response=login&useMock=false',
  LOGOUT = 'auth/logout',
  USER_INFO = 'auth/user',

  DEVICES = 'tenant/deviceInfos',
}

export enum QueryKey {
  LOGIN = 'login',
  USER_INFO = 'user_info',

  DEVICES = 'device_list',
}

export enum ErrorCode {
  ERR = 'ERR',
  ERR_SOCKET = 'ERR_SOCKET',
  ERR_NETWORK = 'ERR_NETWORK',
  ERR_CANCELED = 'ERR_CANCELED',
}
