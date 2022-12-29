export enum Path {
  HOMEPAGE = '/',
  LOGIN = '/login',
  Device = '/devices',

  RELEASES = '/releases',
  RELEASES_UPCOMING = '/upcoming',
  RELEASES_SCHEDULE = '/schedule',
  RELEASES_SCHEDULE_TARGETS = '/targets',

  SETTING = '/setting',

  NOT_FOUND = '/not-found',
  UNDEFINED = '*',
}

export enum FullPath {
  RELEASES_SCHEDULE_MILESTONES = '/releases/schedule/milestones',

  // this will work on Typescript v5. ref: https://github.com/microsoft/TypeScript/pull/50528#issuecomment-1322496801
  // RELEASES_SCHEDULE_MILESTONES = `${Path.RELEASES}${Path.RELEASES_SCHEDULE}/milestones`,
}
