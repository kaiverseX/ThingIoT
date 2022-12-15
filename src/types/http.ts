export enum APIs {
  LOGIN = 'auth/login#response=login&useMock=false',
  GET_DIAGRAM_DATA = '/node/list',
  GET_LIST_EVENT = '/event/search/load-more',
  GET_LIST_EVENT_PAGING = '/event/search/paging',
}

export enum QueryKey {
  LOGIN = 'login',
}

export enum ErrorCode {
  ERR = 'ERR',
  ERR_SOCKET = 'ERR_SOCKET',
  ERR_NETWORK = 'ERR_NETWORK',
  ERR_CANCELED = 'ERR_CANCELED',
}
