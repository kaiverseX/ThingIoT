export enum Path {
  HOMEPAGE = '/',
  LOGIN = '/login',
  UPDATE = '/update',

  DEVICES = '/devices',
  DEVICE_CREATE = '/devices/create',
  DEVICE_DETAIL = '/devices/:id/detail',
  DEVICE_UPDATE = '/devices/:id/update',

  RELEASES = '/releases',
  RELEASES_UPCOMING = '/upcoming',
  RELEASES_SCHEDULE = '/schedule',
  RELEASES_SCHEDULE_TARGETS = '/targets',

  SETTING = '/setting',

  DEMO_UI = '/ui',

  NOT_FOUND = '/not-found',
  UNDEFINED = '*',
}

export enum FullPath {
  RELEASES_SCHEDULE_MILESTONES = '/releases/schedule/milestones',

  // this will work on Typescript v5. ref: https://github.com/microsoft/TypeScript/pull/50528#issuecomment-1322496801
  // RELEASES_SCHEDULE_MILESTONES = `${Path.RELEASES}${Path.RELEASES_SCHEDULE}/milestones`,
}
