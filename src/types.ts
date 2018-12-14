export interface ISession {
  id: number;
  trackId: number;
  locationId: number;
  title: string;
  abstract: string;
  begin: Date;
  end: Date;
}

export interface ISessionInfo {
  id: number;
  title: string;
  speakerName: string;
  speakerImage: string;
  favorite?: boolean;
}
export interface ISessionGroup {
  title?: string;
  sessions: ISessionInfo[];
}
